import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M2 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M2 21c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M6 17l3-6 4 4 3-6" />
        <path d="M18 7A6 6 0 0 0 6 7" />
    </svg>
  );
}
