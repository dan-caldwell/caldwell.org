import type { NextPage } from 'next';
import StandardWithTitle from '../components/layouts/StandardWithTitle';
import Image from '../components/content/Image';

const Home: NextPage = () => {
  return (
    <StandardWithTitle title="Hello — my name is Dan Caldwell. I’m a software engineer. This is a selection of my personal and professional work.">
      <Image src='https://s3.amazonaws.com/caldwell.info/images/doodle-1-1000x764-s0.5-q100.jpg' />
    </StandardWithTitle>
  )
}

export default Home
