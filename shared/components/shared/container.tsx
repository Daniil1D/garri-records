import React from 'react'
import { cn } from '@/shared/lib/utils'

interface Props {
    className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    return (
        <div
            className={cn(
                "mx-auto w-full",
                "px-4 sm:px-6 md:px-8 lg:px-10",
                "max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-[1400px] 2xl:max-w-[1600px]",
                className
            )}
        >
            {children}
        </div>
    )
}