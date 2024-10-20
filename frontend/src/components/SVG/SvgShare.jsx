import './svg.css';

const SvgShare = ({label="Share"}) => {
    return (
        <svg className="defaultSvg" width="217" height="174" viewBox="0 0 217 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={label}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M141.25 155.019L217 77.5093L141.25 0V41.0093H79H68H0L94 173.509L79.2479 114.009H141.25V155.019ZM146.828 141.773L209.313 77.8365L146.828 13.9002V49.0093H75.1659H69H10L87.5392 158.307L75.3167 109.009H146.828V141.773Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M217 77.5093L141.25 155.019V114.009H79.2479L94 173.509L0 41.0093H68H79H141.25V0L217 77.5093Z"/>
        </svg>
    );
};

export default SvgShare;