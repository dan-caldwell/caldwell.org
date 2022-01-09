import handleImages from "./handle-images";
import { sections } from '../../config';

const init = async () => {
    for (const section in sections) {
        await handleImages({
            section
        });
    }
}

init();