import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types'; // Import prop-types

const Breadcrumb = React.forwardRef(({ ...props }, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
));
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.node,
};

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';
BreadcrumbList.propTypes = {
  className: PropTypes.string,
};

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = {
  className: PropTypes.string,
};

const BreadcrumbLink = React.forwardRef(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp
        ref={ref}
        className={cn('transition-colors hover:text-foreground', className)}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';
BreadcrumbLink.propTypes = {
  asChild: PropTypes.bool,
  className: PropTypes.string,
};

const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';
BreadcrumbPage.propTypes = {
  className: PropTypes.string,
};

const BreadcrumbSeparator = ({ children, className, ...props }) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
BreadcrumbSeparator.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const BreadcrumbEllipsis = ({ className, ...props }) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
BreadcrumbEllipsis.propTypes = {
  className: PropTypes.string,
};

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
