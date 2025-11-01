# 🖼️ Guia de Gerenciamento de Imagens

## 📁 Estrutura Criada

```
public/images/
├── logo/              ✅ Logo da empresa
│   └── BARACHO.png
├── banners/           ✅ Banners e backgrounds
│   └── banner.png
├── projects/          📂 Imagens de projetos (adicione aqui)
│   └── .gitkeep
└── services/          📂 Imagens de serviços (adicione aqui)
    └── .gitkeep
```

## ✅ O que foi feito:

1. ✅ Criadas pastas organizadas para cada tipo de imagem
2. ✅ Movidas as imagens existentes (logo e banner)
3. ✅ Atualizados todos os caminhos nos componentes:
   - Header.jsx
   - Hero.jsx
   - Footer.jsx
   - index.html
4. ✅ Criado arquivo utilitário (`src/utils/imagePaths.js`)
5. ✅ Documentação completa em cada pasta

## 📝 Como Adicionar Novas Imagens

### Método 1: Direto nas pastas

1. Copie suas imagens para as pastas correspondentes:
   - **Projetos**: `public/images/projects/`
   - **Serviços**: `public/images/services/`

2. Use no código:
```jsx
<img src="/images/projects/nome-do-arquivo.jpg" alt="Projeto" />
<img src="/images/services/nome-do-arquivo.jpg" alt="Serviço" />
```

### Método 2: Usando o utilitário (Recomendado)

1. Importe o helper:
```jsx
import { getProjectImage, getServiceImage } from '../utils/imagePaths'
```

2. Use no componente:
```jsx
<img src={getProjectImage('projeto-alpinismo-01.jpg')} alt="Projeto Alpinismo" />
<img src={getServiceImage('isolamento-termico-01.jpg')} alt="Isolamento Térmico" />
```

## 🎨 Exemplos Práticos

### Para o Componente Projects:

```jsx
const projects = [
  {
    title: 'Estruturas em Altura',
    category: 'altura',
    description: 'Construção e instalação de estruturas para trabalhos em altura.',
    image: '/images/projects/projeto-estruturas-altura-01.jpg' // 👈 Substitua o emoji
  },
  // ...
]
```

### Para o Componente Services:

```jsx
const services = [
  {
    title: 'Isolamento Térmico',
    description: 'Isolamento térmico para permutadores industriais.',
    image: '/images/services/isolamento-termico-01.jpg', // 👈 Adicione a imagem
    icon: (/* SVG icon */)
  },
  // ...
]
```

## 📋 Nomenclatura Recomendada

### Projetos:
- `projeto-estruturas-altura-01.jpg`
- `projeto-alpinismo-torre-01.jpg`
- `projeto-pintura-industrial-01.jpg`
- `projeto-solda-caldeira-01.jpg`
- `projeto-isolamento-termico-01.jpg`

### Serviços:
- `isolamento-termico-permutador-01.jpg`
- `isolamento-acustico-industrial-01.jpg`
- `protecao-passiva-estrutura-01.jpg`
- `alpinismo-trabalho-altura-01.jpg`
- `pintura-estrutura-metalica-01.jpg`
- `solda-caldeira-manutencao-01.jpg`

## 🔧 Modificando o Componente Projects para usar imagens reais

Quando adicionar suas imagens, modifique o array de projetos em `Projects.jsx`:

```jsx
const projects = [
  {
    title: 'Estruturas em Altura',
    category: 'altura',
    description: 'Construção e instalação de estruturas para trabalhos em altura.',
    image: '/images/projects/projeto-estruturas-altura-01.jpg' // Nova propriedade
  },
  // ... outros projetos
]

// No JSX, substitua:
<span className="project-card__emoji">{project.image}</span>

// Por:
<img 
  src={project.image} 
  alt={project.title} 
  className="project-card__image-photo"
/>
```

## 🎯 Próximos Passos

1. Adicione suas imagens nas pastas `projects/` e `services/`
2. Atualize os arrays de dados nos componentes
3. Substitua os emojis por tags `<img>`
4. Teste o carregamento das imagens
5. Otimize as imagens se necessário

## 💡 Dicas de Otimização

- **Tamanho**: Máximo 1920px de largura
- **Formato**: JPG para fotos, PNG para transparência
- **Compressão**: Use TinyPNG ou Squoosh
- **WebP**: Considere converter para melhor performance

## 📞 Precisa de Ajuda?

Consulte o arquivo `public/images/README.md` para mais detalhes sobre a estrutura e boas práticas!
