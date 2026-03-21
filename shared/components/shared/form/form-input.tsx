'use client'

import { useFormContext } from "react-hook-form";
import { Input } from "../../ui";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { ReguiredSymbol } from "../required-symbol";
import { RegisterOptions } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    required?: boolean;
    rules?: RegisterOptions;
    rightSlot?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export const FormInput: React.FC<Props> = ({
    name,
    label,
    required,
    rules,
    rightSlot,
    disabled,
    className,
    ...props
}) => {
    const { register, formState: { errors }, watch, setValue } = useFormContext()

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, '', { shouldValidate: true })
    }

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                    {label} {required && <ReguiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input
                    className="h-10 sm:h-11 md:h-12 text-sm sm:text-base pr-10"
                    {...register(name, rules)}
                    {...props}
                    disabled={disabled}
                />

                {rightSlot && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {rightSlot}
                    </div>
                )}

                {value && !disabled && (
                    <ClearButton onClick={onClickClear} />
                )}
            </div>

            {errorText && (
                <ErrorText
                    text={errorText}
                    className="mt-1 sm:mt-2 text-xs sm:text-sm"
                />
            )}
        </div>
    )
}