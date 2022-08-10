const SvgComponent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} viewBox="0 0 64 64" {...props}>
    <path
      style={{
        stroke: "none",
        fillRule: "nonzero",
        fill: "#000",
        fillOpacity: 1,
      }}
      d="M5.332 8v40c0 4.387 3.613 8 8 8h37.336c4.387 0 8-3.613 8-8V18.668h-5.336V48c0 1.508-1.16 2.668-2.664 2.668C49.16 50.668 48 49.508 48 48V8Zm5.336 5.332h32V48c0 1.035.742 1.754 1.11 2.668H13.331c-1.504 0-2.664-1.16-2.664-2.668ZM16 18.668v8h21.332v-8ZM16 32v5.332h21.332V32Zm0 10.668V48h21.332v-5.332Zm0 0"
    />
  </svg>
)

export default SvgComponent
