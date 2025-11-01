# 📁 Estrutura de Imagens - Baracho Soluções

## 🗂️ Organização das Pastas

### `/logo`
Armazena os arquivos de logo da empresa
- **BARACHO.png** - Logo principal da empresa
- Adicione aqui: logos variantes, favicon, etc.

### `/banners`
Armazena imagens de banners e headers
- **banner.png** - Banner principal do Hero
- Adicione aqui: banners secundários, backgrounds, etc.

### `/projects`
Armazena imagens dos projetos realizados
- Adicione aqui: fotos de projetos concluídos
- Nomenclatura sugerida:
  - `projeto-estruturas-altura-01.jpg`
  - `projeto-alpinismo-01.jpg`
  - `projeto-pintura-industrial-01.jpg`
  - `projeto-solda-caldeira-01.jpg`

### `/services`
Armazena imagens relacionadas aos serviços
- Adicione aqui: fotos de equipamentos, equipes em ação
- Nomenclatura sugerida:
  - `isolamento-termico-01.jpg`
  - `isolamento-acustico-01.jpg`
  - `protecao-passiva-01.jpg`
  - `alpinismo-industrial-01.jpg`
  - `pintura-industrial-01.jpg`
  - `solda-caldeira-01.jpg`

## 📝 Boas Práticas

### Nomenclatura de Arquivos
- Use nomes descritivos em minúsculas
- Separe palavras com hífen (-)
- Evite espaços e caracteres especiais
- Adicione números sequenciais para variações (01, 02, 03...)

Exemplos:
- ✅ `projeto-alpinismo-torre-01.jpg`
- ✅ `servico-isolamento-permutador.jpg`
- ❌ `Projeto Alpinismo.jpg`
- ❌ `foto final.png`

### Formatos Recomendados
- **PNG**: Para logos e imagens com transparência
- **JPG/JPEG**: Para fotos e imagens com muitas cores
- **WebP**: Para otimização de carregamento (opcional)

### Otimização
- Mantenha imagens em resolução adequada (1920px de largura máxima)
- Comprima imagens antes de adicionar ao projeto
- Use ferramentas como TinyPNG, ImageOptim ou Squoosh

## 🔗 Uso no Código

### Importar no React/Vite:
```javascript
// Logo
<img src="/images/logo/BARACHO.png" alt="Logo Baracho" />

// Banner
<img src="/images/banners/banner.png" alt="Banner" />

// Projetos
<img src="/images/projects/projeto-nome-01.jpg" alt="Projeto" />

// Serviços
<img src="/images/services/servico-nome-01.jpg" alt="Serviço" />
```

## 📊 Status Atual

```
/images/
├── /logo/
│   └── BARACHO.png ✅
├── /banners/
│   └── banner.png ✅
├── /projects/
│   └── (adicione suas imagens aqui)
└── /services/
    └── (adicione suas imagens aqui)
```
