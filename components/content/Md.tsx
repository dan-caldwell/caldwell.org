import marked from 'marked';
import ReactHtmlParser from 'react-html-parser';

const Md = ({ children, direction = 'column', className = '', type = '' }) => {

    if (!Array.isArray(children)) {
        return typeof children === 'string' ? ReactHtmlParser(marked(children)) : children
    }

    const mapped = children.map(child => (
        typeof child === 'string' ? ReactHtmlParser(marked(child)) : child
    ));

    return <div 
        className={`Md 
            ${direction === 'row' ? 'flex' : ''} 
            ${className}
            ${type === 'youtube' ? 'flex flex-col h-full overflow-hidden' : ''}
        `}
    >{mapped}</div>
}

export default Md;