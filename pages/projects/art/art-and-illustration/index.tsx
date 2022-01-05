import SlideshowContainer from '../../../../components/layouts/SlideshowContainer';
import meta from './meta.json';

export default function Index() {
    return (
        <SlideshowContainer meta={meta}>
            <div>Hello</div>
            <div>World</div>
        </SlideshowContainer>
    )
}