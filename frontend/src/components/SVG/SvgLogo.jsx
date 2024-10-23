import './svg.css';

const SvgLogo = ({className=""}) => {
    return (
        <svg className={`${className}`} width="150" height="156" viewBox="0 0 150 156" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M48 81.3915C53.3285 78.7949 57 73.3262 57 67C57 58.1634 49.8366 51 41 51C32.1634 51 25 58.1634 25 67C25 73.7148 29.1363 79.4634 35 81.837V104.5C35 108.09 37.9101 111 41.5 111C45.0899 111 48 108.09 48 104.5V81.3915Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 156V0L150 86L0 156ZM8 139V17L138 85.5L8 139Z"/>
        </svg>
    );
};

export default SvgLogo;