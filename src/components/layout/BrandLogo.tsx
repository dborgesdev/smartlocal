import markup from "/brand/lockup-light.svg?raw";
// Trusted, original repository vector. Inline SVG allows its Manrope text to use the local font.
export default function BrandLogo() {
  return (
    <span
      className="brand-asset"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
