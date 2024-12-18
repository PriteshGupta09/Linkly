import React from 'react'

const Cube = (props) => {

    const { height, width } = props
    return (
        <svg width={width} height={height} viewBox="0 0 399 422" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_bdd_1_90)">
                <rect x="15.0293" y="223.401" width="261.206" height="261.206" rx="59.217" transform="rotate(-45 15.0293 223.401)" fill="#0E131E" />
            </g>
            <defs>
                <filter id="filter0_bdd_1_90" x="-46.5759" y="-22.905" width="492.612" height="492.612" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="43.0669" />
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_90" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="10.7667" />
                    <feGaussianBlur stdDeviation="13.4584" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="effect1_backgroundBlur_1_90" result="effect2_dropShadow_1_90" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="-24" />
                    <feGaussianBlur stdDeviation="19.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.0139583 0 0 0 0 0.0176389 0 0 0 0 0.025 0 0 0 1 0" />
                    <feBlend mode="normal" in2="effect2_dropShadow_1_90" result="effect3_dropShadow_1_90" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow_1_90" result="shape" />
                </filter>
            </defs>
        </svg>


    )
}

export default Cube
