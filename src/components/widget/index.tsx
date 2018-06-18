import { h } from "preact";

export interface HelloWorldProps {
  color?: string
}

export default function HelloWorld(props: HelloWorldProps) {
  return (
    <div>
      <h1 style={{ color: props.color }}>
        Hello, World!
      </h1>
    </div>
  );
}