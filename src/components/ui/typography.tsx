import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

type TypographyProps = {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    text: string;
    className?: string;

} & HTMLAttributes<HTMLElement>

const Typography: FC<TypographyProps> = ({ variant = 'h1', text, className, ...props }) => {

   const classNames = {
    h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    h2: 'scroll-m-20 text-3xl font-bold tracking-tight first:mt-0',
    h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    h4: 'scroll-m-20 text-xl font-medium tracking-tight',
    h5: 'scroll-m-20 text-lg font-normal tracking-tight',
    h6: 'scroll-m-20 text-base font-semibold tracking-tight',
    p: 'leading-7 [&:not(:first-child)]:mt-6',
    span: 'text-muted-foreground',

   };

   const Tag = variant;
   const defaultClassNames = classNames[variant];
   const combinedClassNames = cn(defaultClassNames, className);

  return <Tag className={combinedClassNames} {...props}>{text}</Tag>;
};

export default Typography;