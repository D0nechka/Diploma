import React from 'react';
import classNames from 'classnames';
import cls from './style.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { Text, TextSize, TextType } from 'ui/components/kit/Text/Text';

export enum InputType {
    PRIMARY = 'primary',
    OUTLINE = 'outline',
    BOTTOM_LINE = 'bottomLine'
}

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>

interface InputProps extends HTMLInputProps {
   inputType?: InputType;
   isSearch?: boolean;
   labelText?: string;
   labelSize?: TextSize;
   labelType?: TextType;
   onChange?: (value: string) => void;
}

export const Input = (props: InputProps) => {
    const {
        inputType = InputType.PRIMARY,
        className,
        isSearch = false,
        labelText,
        labelSize,
        labelType,
        onChange,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, } = e.target;

        onChange?.(value);
    };

    return (
        <>
            {labelText?.length && (
                <Text
                    className={classNames(cls.label, {
                        [cls.labelSearch]: isSearch,
                    })}
                    textSize={labelSize}
                    textType={labelType}
                >{labelText}</Text>
            )}
            <div className={cls.inputContainer}>
                {isSearch && <AiOutlineSearch className={cls.iconSearch} />}
                <input
                    onChange={onChangeHandler}
                    className={classNames(
                        cls.input,
                        { [cls.search]: isSearch, },
                        cls[inputType],
                        className
                    )}
                    {...otherProps}
                />
            </div>
        </>
    );
};
