import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20 6L9 17L4 12" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowRightIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5 12H19M19 12L12 5M19 12L12 19" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const EmailIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M22 6L12 13L2 6" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const PhoneIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M22 16.92V19.92C22 20.4696 21.5523 20.9173 21.0027 20.9201C18.4217 20.9456 15.8672 20.3294 13.5613 19.1204C11.3864 18.0022 9.49023 16.4033 7.99991 14.4323C6.35524 12.3733 5.24556 9.94395 4.75869 7.35715C4.62174 6.68726 4.99211 6.02856 5.63089 5.75951L8.26489 4.69751C8.81793 4.46451 9.45589 4.7042 9.75189 5.22751L11.256 8.26451C11.5269 8.74651 11.412 9.34651 10.9739 9.69751L9.16189 11.138C9.01389 11.2615 8.95489 11.4615 9.00989 11.6455C9.70889 13.9815 11.0189 16.2915 12.8299 17.6215C12.9939 17.7415 13.2179 17.7415 13.3819 17.6215L15.253 16.1825C15.6709 15.8595 16.2479 15.8035 16.724 16.0435L19.766 17.5125C20.3189 17.7885 20.5839 18.4065 20.426 18.9805L20.022 20.4805C19.8829 20.9805 19.414 21.3205 18.914 21.3205H18.9139Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

