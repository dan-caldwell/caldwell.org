import React from 'react';

type LogoProps = {
    className?: string,
    fill: 'white' | 'black'
}

const Logo: React.FC<LogoProps> = ({ className = '', fill }) => {
    return (
        <div className={className}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 312.396 321.546" fill={fill}><g id="Layer_2" data-name="Layer 2"><g id="Layer_6" data-name="Layer 6"><path d="M45.743,172.441c8.092,5.614,15.523,11.394,18.33,15.192s8.092,10.734,13.046,15.193,12.385,11.56,20.807,11.89,16.019-1.321,17.835-2.973a20.023,20.023,0,0,0,5.945-12.22c.5-5.945,1.156-9.908,1.982-15.192s.66-17.34.991-20.973,1.486-9.082,1.156-14.7-2.312-15.193-4.129-22.624-5.284-18.33-6.275-23.614-3.138-21.3-3.963-29.23-2.147-11.394-2.808-18.33-2.146-16.183-1.651-21.633.352-11.732,10.4-13.706c9.247-1.817,12.055,6.44,13.871,11.559,0,0,3.8,16.844,3.963,19.156s2.973,17.175,3.8,19.817,5.779,15.688,6.275,17.835,1.816,17.669,2.807,22.458,3.963,19.982,5.78,21.963,5.119,5.12,8.587,4.789,5.45.331,5.45-5.449-.331-21.8-.661-25.762a214.637,214.637,0,0,1-.826-22.623c.331-7.431,2.477-25.927,2.973-30.386s2.807-29.229,3.3-33.027-.771-16.679,10.9-19.321,18.055,4.844,16.293,15.743-2.972,28.734-3.082,32.477.11,21.908.99,28.294.881,22.678-.88,30.715-2.973,26.862-.331,28.624,7.6,5.394,10.9,1.321,7.376-16.514,8.807-22.018,5.064-14.422,9.688-23.23S237.247,64.716,240.99,57.01s5.175-10.9,6.606-14.422,8.7-16.073,20.147-9.578c8.528,4.838,6.605,12.11,2.532,21.468,0,0-7.376,17.284-9.248,21.358s-6.495,16.293-8.257,21.908-6.5,19.266-11.449,30.385a161.008,161.008,0,0,0-9.138,26.642c-.771,3.743-1.651,4.954,1.651,6.716s7.487,4.073,11.56.11,11.78-16.734,14.862-21.028S273.8,122.4,276.11,118.881s12.99-22.458,14.2-24.66,8.587-12.551,16.294-9.358c10.037,4.158,4.624,15.523,1.541,22.9a86.593,86.593,0,0,1-4.844,10.9c-2.312,3.963-6.275,8.807-7.266,11.229s-9.137,19.487-13.321,24.331-14.972,19.046-17.725,25.541-3.633,10.9-4.624,18.826-7.156,48.77-10.128,59.449a133.24,133.24,0,0,1-10.128,25.982c-4.074,8.146-4.074,7.926-4.955,14.311s-1.1,14.533-3.522,17.175-16.955,3.963-32.367,3.743-43.156,3.963-51.523,1.541-20.7-12.11-25.541-17.174S100.844,278.074,96,274.331s-18.055-7.707-21.8-14.312-14.092-24-19.6-31.266-19.431-18.5-23.889-23.45-16.679-15.192-20.643-18.165S0,179.046,0,174.918c0-3.855,4.106-11.229,19.651-11.229C34.183,163.689,45.743,172.441,45.743,172.441Z"></path></g></g></svg>
        </div>
    )
}

export default Logo;