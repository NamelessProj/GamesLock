import './svg.css';

const SvgHome = ({label="Home", nav=false}) => {
    return (
        <svg className={(nav ? 'navSvg ' : '') + "defaultSvg"} width="104" height="129" viewBox="0 0 104 129" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={label}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M51.5285 0L103.057 42H103.026V129H66.0286V81H37.0286V129H0.0259628V42H0L51.5285 0ZM51.5286 6L98.2638 44.093H98.0285V125H69.0285V78H34.0285V125H5.02855V44.093H4.79346L51.5286 6Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M103.057 42L51.5285 0L0 42H0.0259628V129H37.0286V81H66.0286V129H103.026V42H103.057Z"/>
        </svg>
    );
};

export default SvgHome;