/**
 * Utilitário para gerenciar caminhos de imagens
 * Facilita o uso e manutenção das imagens no projeto
 */

// Caminhos base
const IMAGES_BASE = '/images'

export const ImagePaths = {
  // Logo
  logo: {
    main: `${IMAGES_BASE}/logo/BARACHO.png`,
  },

  // Banners
  banners: {
    main: `${IMAGES_BASE}/banners/banner.png`,
    // Adicione mais banners aqui quando necessário
    // secondary: `${IMAGES_BASE}/banners/banner-secondary.png`,
  },

  // Projetos
  projects: {
    // Exemplo de como adicionar imagens de projetos:
    // estruturaAltura01: `${IMAGES_BASE}/projects/projeto-estruturas-altura-01.jpg`,
    // alpinismo01: `${IMAGES_BASE}/projects/projeto-alpinismo-01.jpg`,
    // pinturaIndustrial01: `${IMAGES_BASE}/projects/projeto-pintura-industrial-01.jpg`,
  },

  // Serviços
  services: {
    // Exemplo de como adicionar imagens de serviços:
    // isolamentoTermico01: `${IMAGES_BASE}/services/isolamento-termico-01.jpg`,
    // isolamentoAcustico01: `${IMAGES_BASE}/services/isolamento-acustico-01.jpg`,
    // protecaoPassiva01: `${IMAGES_BASE}/services/protecao-passiva-01.jpg`,
  },
}

/**
 * Helper para obter caminho de imagem de projeto por nome
 * @param {string} filename - Nome do arquivo (ex: 'projeto-alpinismo-01.jpg')
 * @returns {string} Caminho completo da imagem
 */
export const getProjectImage = (filename) => {
  return `${IMAGES_BASE}/projects/${filename}`
}

/**
 * Helper para obter caminho de imagem de serviço por nome
 * @param {string} filename - Nome do arquivo (ex: 'isolamento-termico-01.jpg')
 * @returns {string} Caminho completo da imagem
 */
export const getServiceImage = (filename) => {
  return `${IMAGES_BASE}/services/${filename}`
}

/**
 * Helper para obter caminho de banner por nome
 * @param {string} filename - Nome do arquivo (ex: 'banner-secondary.png')
 * @returns {string} Caminho completo da imagem
 */
export const getBannerImage = (filename) => {
  return `${IMAGES_BASE}/banners/${filename}`
}

export default ImagePaths
