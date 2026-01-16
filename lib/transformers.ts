export function svgToJsx(svg: string): string {
  if (!svg) return "";

  let jsx = svg;

  jsx = jsx.replace(/<\?xml.*?\?>/g, "");

  jsx = jsx.replace(/<!--[\s\S]*?-->/g, "");

  jsx = jsx.replace(/^\s*[\r\n]/gm, "");

  jsx = jsx.replace(/\s+tabindex\s*=\s*["']?[^"'\s>]*["']?/gi, "");
  jsx = jsx.replace(/\s+for\s*=\s*["']?[^"'\s>]*["']?/gi, "");

  const replacements: Record<string, string> = {
    "class=": "className=",
    "xmlns:xlink=": "xmlnsXlink=",
    "xlink:href=": "xlinkHref=",
    "fill-rule=": "fillRule=",
    "clip-rule=": "clipRule=",
    "stroke-width=": "strokeWidth=",
    "stroke-linecap=": "strokeLinecap=",
    "stroke-linejoin=": "strokeLinejoin=",
    "stroke-miterlimit=": "strokeMiterlimit=",
    "stop-color=": "stopColor=",
    "stop-opacity=": "stopOpacity=",
    "text-anchor=": "textAnchor=",
    "alignment-baseline=": "alignmentBaseline=",
    "dominant-baseline=": "dominantBaseline=",
    "stroke-opacity=": "strokeOpacity=",
    "fill-opacity=": "fillOpacity=",
    "pointer-events=": "pointerEvents=",
    "crossorigin=": "crossOrigin=",
  };

  Object.entries(replacements).forEach(([kebab, camel]) => {
    const regex = new RegExp(kebab, "g");
    jsx = jsx.replace(regex, camel);
  });

  return jsx.trim();
}

export function wrapInComponent(jsx: string, name: string): string {
  const safeName = name.replace(/[^a-zA-Z0-9]/g, "") || "Icon";

  let componentBody = jsx;
  if (componentBody.includes("<svg")) {
    componentBody = componentBody.replace("<svg", "<svg {...props}");
  }

  return `export default function ${safeName}(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${componentBody.split("\n").join("\n    ")}
  );
}`;
}
