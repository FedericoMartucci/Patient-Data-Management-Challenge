import { useEffect, useState } from 'react';
import * as icons from '../Icon/index';
import { cva, type VariantProps } from 'class-variance-authority';
import Body2 from '../../utils/typography/body2/body2';
import HelperText from '../../utils/typography/helpertext/helpertext';
import Body1 from '../../utils/typography/body1/body1';
import Icon from '../Icon/Icon';
import config from '../../../tailwind.config';

const inputVariants = cva(
  ['border-none outline-none py-3 px-4 w-full font-poppins font-extralight'],
  {
    variants: {
      variant: {
        default: ['placeholder-gray-400 text-gray-800 cursor-text'],
        error: ['placeholder-lighterror/70 bg-transparent text-lighterror'],
        disabled: ['disabled:bg-gray-300/10 rounded-sm', 'cursor-not-allowed']
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);
export interface InputProps
  extends VariantProps<typeof inputVariants>,
    React.HTMLAttributes<HTMLInputElement> {
  value?: string;
  type?: 'text';
  helpertext?: string;
  icon?: keyof typeof icons;
  label?: string;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  handleValue: (value: string) => void;
  defaultValue?: string;
  error?: string;
}

const Input = ({
  value = '',
  className,
  variant,
  type = 'text',
  helpertext = '',
  label = '',
  required = false,
  handleValue,
  placeholder = '',
  defaultValue = '',
  icon,
  error = ''
}: InputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const colors = config.theme.extend.colors;

  const hoverBorderColor =
    variant === 'error'
      ? colors.error
      : isHovered || isFocused
        ? colors.secondary
        : colors.gray['200'];

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const textColor: string =
    variant === 'error'
      ? 'text-error'
      : variant === 'disabled'
        ? 'text-gray-300'
        : 'text-white';

  const handleChange = (textEntered: string): void => {
    setInputValue(textEntered);
    handleValue(textEntered);
  };

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);
  return (
    <div className="gap-2 flex flex-col w-full">
      <div
        className="border-b flex flex-col gap-2 transition-colors duration-300"
        style={{
          borderBottomColor: hoverBorderColor
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {label !== '' && (
          <div className="flex">
            <Body1
              className={`${variant === 'disabled' ? 'text-black' : 'text-gray-900'} flex items-center font-extralight`}
            >
              {label}
            </Body1>
            {variant !== 'disabled' && required && (
              <Body2 className="text-error flex text-sm font-normal">
                &nbsp;*
              </Body2>
            )}
          </div>
        )}
        <div className="flex items-center justify-center">
          {icon && (
            <div className="min-w-6">
              <Icon name={icon} fillColor={colors.black} />
            </div>
          )}
          <input
            className={className + inputVariants({ variant, className })}
            value={inputValue}
            type={type}
            required={required}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
            disabled={variant === 'disabled'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {inputValue !== '' && (
            <button
              onClick={() => handleChange('')}
              className="rounded-full hover:bg-gray-100 p-0.5"
              type="button"
              title="Reset input value"
            >
              <Icon name={'DismissIcon'} fillColor="#120340" />
            </button>
          )}
        </div>
      </div>
      {helpertext !== '' && (
        <HelperText className={textColor}>{helpertext}</HelperText>
      )}
      {error !== '' && <HelperText className={textColor}>{error}</HelperText>}
    </div>
  );
};

export default Input;
