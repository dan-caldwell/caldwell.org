export const Dash = ({ className = '', fill = undefined }) => (
    <svg fill={fill} className={className} fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="100%" height="100%" viewBox="0 0 60 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1,0,0,1,-660,-50)">
            <g transform="matrix(7.5,0,0,7.5,630,-6.25)">
                <path fillRule="nonzero" d="M4,8C4,7.726 4.226,7.5 4.5,7.5L11.5,7.5C11.774,7.5 12,7.726 12,8C12,8.274 11.774,8.5 11.5,8.5L4.5,8.5C4.226,8.5 4,8.274 4,8Z" />
            </g>
        </g>
    </svg>
)

export const Plus = ({ className = '', fill = undefined }) => (
    <svg className={className} fill={fill} fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" width="100%" height="100%" viewBox="0 0 116 116" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1,0,0,1,-723.578,-64.3239)">
            <g transform="matrix(14.4595,0,0,14.4595,665.74,6.48585)">
                <path fillRule="nonzero" d="M8,4C8.274,4 8.5,4.226 8.5,4.5L8.5,7.5L11.5,7.5C11.774,7.5 12,7.726 12,8C12,8.274 11.774,8.5 11.5,8.5L8.5,8.5L8.5,11.5C8.5,11.774 8.274,12 8,12C7.726,12 7.5,11.774 7.5,11.5L7.5,8.5L4.5,8.5C4.226,8.5 4,8.274 4,8C4,7.726 4.226,7.5 4.5,7.5L7.5,7.5L7.5,4.5C7.5,4.226 7.726,4 8,4Z" />
            </g>
        </g>
    </svg>
)

export const CaretDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
)

export const CaretRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
    </svg>
)