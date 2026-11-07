import { barachoProjects } from './barachoProjects'

const fieldProjects = [
  {
    title: 'Alpinismo Industrial 1',
    category: 'alpinismo',
    categoryLabel: 'Alpinismo',
    description: 'Trabalho de alpinismo industrial com segurança e precisão.',
    image: '/images/projects/alphinismo/alphinismo 1.jpg'
  },
  {
    title: 'Alpinismo Industrial 2',
    category: 'alpinismo',
    categoryLabel: 'Alpinismo',
    description: 'Instalação e manutenção em altura com técnicas especializadas.',
    image: '/images/projects/alphinismo/alphinismo 2.jpg'
  },
  {
    title: 'Pintura Industrial 1',
    category: 'pintura-industrial',
    categoryLabel: 'Pintura Industrial',
    description: 'Acabamento de pintura em estruturas industriais.',
    image: '/images/projects/pintura industrial/pintura industrial 1.jpg'
  },
  {
    title: 'Pintura Industrial 2',
    category: 'pintura-industrial',
    categoryLabel: 'Pintura Industrial',
    description: 'Pintura especializada em equipamentos industriais.',
    image: '/images/projects/pintura industrial/pintura industrial 2.jpg'
  },
  {
    title: 'Serviço de Solda e Caldeira 1',
    category: 'solda',
    categoryLabel: 'Solda e Caldeira',
    description: 'Serviços especializados em solda de alta qualidade.',
    image: '/images/projects/solda e caldeira/serviço de solda e caldeira.jpg'
  },
  {
    title: 'Serviço de Solda e Caldeira 2',
    category: 'solda',
    categoryLabel: 'Solda e Caldeira',
    description: 'Manutenção e reparo de caldeiras industriais.',
    image: '/images/projects/solda e caldeira/serviço de solda e caldeira 2.jpg'
  }
]

export const allProjects = [...fieldProjects, ...barachoProjects]

export const projectFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'isolamento-termico', label: 'Isolamento Térmico' },
  { id: 'refratario', label: 'Refratário' },
  { id: 'pintura-industrial', label: 'Pintura Industrial' },
  { id: 'estrutura-metalica', label: 'Estrutura Metálica' },
  { id: 'alpinismo', label: 'Alpinismo' },
  { id: 'montagem-andaime', label: 'Montagem de Andaime' },
  { id: 'laminacao-piso', label: 'Laminação de Piso' },
  { id: 'construcao-civil', label: 'Construção Civil' },
  { id: 'concretagem-civil', label: 'Concretagem Civil' },
  { id: 'solda', label: 'Solda e Caldeira' }
]

export const categoryLabel = (project) => project.categoryLabel || project.category
