let cached: boolean | undefined;

/**
 * True when WebGL is missing or runs on a CPU (software) renderer such as
 * SwiftShader or llvmpipe. There, shader compilation and every frame are slow
 * enough to block the page, so the WebGL effects use static fallbacks instead.
 * Checked once per page load.
 */
export function hasSoftwareRendering() {
  if (cached !== undefined) return cached;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  if (!gl) {
    cached = true;
    return cached;
  }
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  cached = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
  return cached;
}
