import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg width="120" height="120" viewBox="-20 -20 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 60H0V0C33.137 0 60 26.8626 60 60Z" fill="#DC2626"/>
            <path d="M120 60H60V0C93.137 0 120 26.8626 120 60Z" fill="#DC2626"/>
            <path d="M60 120H0V60C33.137 60 60 86.8626 60 120Z" fill="#DC2626"/>
            <path d="M120 120H60V60C93.137 60 120 86.8626 120 120Z" fill="#DC2626"/>
        </svg>
    );
}
