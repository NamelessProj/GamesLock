import './svg.css';

const SvgBell = ({label="Notifications", nav=false}) => {
    return (
        <svg className={(nav ? 'navSvg ' : '') + "defaultSvg"} width="346" height="432" viewBox="0 0 346 432" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={label}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M346 173C346 77.4547 268.545 0 173 0C77.4548 0 0 77.4547 0 173V365H346V173ZM333.677 173.677C333.677 84.9374 261.739 13 173 13C84.2607 13 12.3233 84.9374 12.3233 173.677V352H333.677V173.677ZM173.5 420C152.706 420 135.17 406.051 129.739 387H217.262C211.83 406.051 194.294 420 173.5 420Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M173 0C268.545 0 346 77.4547 346 173V365H0V173C0 77.4547 77.4547 0 173 0ZM173.497 432C148.535 432 128.268 411.899 128 387H218.995C218.727 411.899 198.459 432 173.497 432Z"/>
        </svg>
    );
};

export default SvgBell;