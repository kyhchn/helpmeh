'use client'
import Typewriter from "typewriter-effect";
type Props = {};

const TypeWriter = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("📈 Increases productivity.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🐑 Powered by AI.")
          .start();
      }}
    />
  );
};
export default TypeWriter;
