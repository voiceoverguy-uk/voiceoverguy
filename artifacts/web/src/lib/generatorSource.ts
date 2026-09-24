const serviceSources = {
  '/santa-voice': {
    source: 'santa-script-generator',
    label: 'Santa Script Generator',
  },
  '/david-attenborough-voice': {
    source: 'attenborough-script-generator',
    label: 'David Attenborough Script Generator',
  },
} as const;

export function generatorSourceForService(pathname: string, search: string) {
  const service = serviceSources[pathname as keyof typeof serviceSources];
  if (!service || new URLSearchParams(search).get('source') !== service.source) {
    return null;
  }
  return service;
}