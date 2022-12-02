import Layout from "../src/components/Layout";

const About = ({ articles }) => {
  return (
    <div className="text-gray-200 flex flex-col  justify-center items-center">
      <div className="relative">About</div>
    </div>
  );
};

About.getLayout = (page) => <Layout>{page}</Layout>;
export default About;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
