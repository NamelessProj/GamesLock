import './svg.css';

const SvgComment = ({label="Comment", nav=false}) => {
    return (
        <svg className={(nav ? 'navSvg ' : '') + "defaultSvg"} width="204" height="132" viewBox="0 0 204 132" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={label}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47705 0 10 0H194C199.523 0 204 4.47715 204 10V94C204 99.5229 199.523 104 194 104H47.8354L14.7083 131.474L9.69995 103.996C4.31592 103.837 0 99.4225 0 94V10ZM5 10C5 7.23858 7.23858 5 10 5H193C195.761 5 198 7.23858 198 10V94C198 96.7614 195.761 99 193 99H47.9093L18.2663 123.584L13.7855 99H10C7.23858 99 5 96.7614 5 94V10Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.47715 0 0 4.47715 0 10V94C0 99.4225 4.31586 103.837 9.69987 103.996L14.7082 131.474L47.8354 104H194C199.523 104 204 99.5229 204 94V10C204 4.47715 199.523 0 194 0H10Z"/>
        </svg>
    );
};

export default SvgComment;