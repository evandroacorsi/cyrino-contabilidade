import type { LucideIcon } from "lucide-react";
import { FileText, Calculator, TrendingUp, AlertCircle, Building2, Briefcase } from "lucide-react";

export interface BlogPost {
  slug: string;
  icon: LucideIcon;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  content: Array<{
    type: 'heading' | 'paragraph' | 'list' | 'highlight';
    text?: string;
    items?: string[];
  }>;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-abrir-empresa-2025",
    icon: FileText,
    title: "Como Abrir uma Empresa em 2025: Guia Completo",
    excerpt: "Descubra o passo a passo completo para abrir sua empresa de forma rápida e segura, evitando erros comuns.",
    category: "Abertura de Empresa",
    date: "15 de Janeiro, 2025",
    readTime: "8 min",
    color: "from-blue-500 to-cyan-500",
    content: [
      {
        type: "paragraph",
        text: "Abrir uma empresa é um dos passos mais importantes na vida de um empreendedor. Com as mudanças constantes na legislação e os processos cada vez mais digitalizados, é fundamental estar bem informado para fazer escolhas certas desde o início."
      },
      {
        type: "heading",
        text: "1. Planejamento Inicial"
      },
      {
        type: "paragraph",
        text: "Antes de iniciar qualquer processo burocrático, é essencial fazer um planejamento detalhado do seu negócio. Isso inclui definir o modelo de negócio, público-alvo, produtos ou serviços oferecidos e projeções financeiras."
      },
      {
        type: "highlight",
        text: "Dica importante: Invista tempo no planejamento. Uma boa estratégia inicial pode economizar muito dinheiro e evitar problemas futuros."
      },
      {
        type: "heading",
        text: "2. Escolha do Tipo de Empresa"
      },
      {
        type: "paragraph",
        text: "Existem diferentes tipos jurídicos de empresa no Brasil, cada um com suas características e vantagens:"
      },
      {
        type: "list",
        items: [
          "MEI (Microempreendedor Individual) - Para faturamento até R$ 81 mil/ano",
          "ME (Microempresa) - Faturamento até R$ 360 mil/ano",
          "EPP (Empresa de Pequeno Porte) - Faturamento entre R$ 360 mil e R$ 4,8 milhões/ano",
          "Sociedade Limitada - Para empresas com dois ou mais sócios",
          "Sociedade Anônima - Para grandes empresas com ações"
        ]
      },
      {
        type: "heading",
        text: "3. Definição do Regime Tributário"
      },
      {
        type: "paragraph",
        text: "A escolha do regime tributário é uma das decisões mais importantes e impacta diretamente na carga de impostos da sua empresa:"
      },
      {
        type: "list",
        items: [
          "Simples Nacional - Tributação simplificada e reduzida para pequenas empresas",
          "Lucro Presumido - Para empresas com margem de lucro alta",
          "Lucro Real - Obrigatório para empresas com faturamento acima de R$ 78 milhões/ano"
        ]
      },
      {
        type: "highlight",
        text: "Atenção: A escolha errada do regime tributário pode fazer você pagar até 40% mais impostos do que o necessário. Consulte sempre um contador especializado."
      },
      {
        type: "heading",
        text: "4. Documentação Necessária"
      },
      {
        type: "paragraph",
        text: "Para abrir sua empresa, você precisará reunir os seguintes documentos:"
      },
      {
        type: "list",
        items: [
          "RG e CPF dos sócios",
          "Comprovante de residência atualizado",
          "Certidão de casamento (se aplicável)",
          "Comprovante do endereço comercial",
          "Contrato social ou requerimento de empresário",
          "Consulta prévia de viabilidade do nome empresarial"
        ]
      },
      {
        type: "heading",
        text: "5. Registro e Licenças"
      },
      {
        type: "paragraph",
        text: "Após reunir a documentação, é necessário realizar os seguintes registros:"
      },
      {
        type: "list",
        items: [
          "Registro na Junta Comercial do seu estado",
          "Inscrição no CNPJ junto à Receita Federal",
          "Inscrição Estadual (se aplicável)",
          "Inscrição Municipal e licença de funcionamento",
          "Alvará de funcionamento",
          "Licenças específicas do seu ramo de atividade"
        ]
      },
      {
        type: "heading",
        text: "Conclusão"
      },
      {
        type: "paragraph",
        text: "Abrir uma empresa envolve diversos passos e decisões importantes. Contar com o apoio de profissionais especializados pode fazer toda a diferença no sucesso do seu negócio. A Cyrino Contabilidade está pronta para ajudar você em todas as etapas desse processo."
      }
    ]
  },
  {
    slug: "simples-nacional-vs-lucro-presumido",
    icon: Calculator,
    title: "Simples Nacional vs Lucro Presumido: Qual Escolher?",
    excerpt: "Entenda as diferenças entre os regimes tributários e saiba qual é o mais vantajoso para seu negócio.",
    category: "Tributação",
    date: "10 de Janeiro, 2025",
    readTime: "6 min",
    color: "from-emerald-500 to-teal-500",
    content: [
      {
        type: "paragraph",
        text: "A escolha do regime tributário é uma das decisões mais impactantes para a saúde financeira de uma empresa. O Simples Nacional e o Lucro Presumido são duas das opções mais comuns, e cada uma tem suas vantagens e desvantagens."
      },
      {
        type: "heading",
        text: "O Que é o Simples Nacional?"
      },
      {
        type: "paragraph",
        text: "O Simples Nacional é um regime tributário simplificado destinado a micro e pequenas empresas. Ele unifica oito impostos em uma única guia de pagamento (DAS), facilitando muito a vida do empresário."
      },
      {
        type: "list",
        items: [
          "Faturamento máximo de R$ 4,8 milhões por ano",
          "Alíquotas que variam de 4% a 33%, dependendo da atividade e faturamento",
          "Recolhimento unificado de impostos",
          "Menos burocracia e obrigações acessórias",
          "Preferência em licitações públicas"
        ]
      },
      {
        type: "heading",
        text: "O Que é o Lucro Presumido?"
      },
      {
        type: "paragraph",
        text: "O Lucro Presumido é um regime onde a Receita Federal presume um percentual de lucro sobre o faturamento da empresa para calcular os impostos. É uma opção intermediária entre o Simples e o Lucro Real."
      },
      {
        type: "list",
        items: [
          "Para empresas com faturamento até R$ 78 milhões por ano",
          "A margem de lucro é presumida entre 8% e 32%, dependendo da atividade",
          "Impostos calculados separadamente",
          "Mais flexibilidade em alguns aspectos",
          "Pode ser mais vantajoso para empresas com margem de lucro alta"
        ]
      },
      {
        type: "heading",
        text: "Quando Escolher o Simples Nacional?"
      },
      {
        type: "paragraph",
        text: "O Simples Nacional geralmente é mais vantajoso para:"
      },
      {
        type: "list",
        items: [
          "Empresas iniciantes com faturamento baixo",
          "Negócios com margem de lucro menor",
          "Empresários que querem menos burocracia",
          "Empresas de serviços com poucos funcionários",
          "Negócios que precisam de agilidade na gestão tributária"
        ]
      },
      {
        type: "heading",
        text: "Quando Escolher o Lucro Presumido?"
      },
      {
        type: "paragraph",
        text: "O Lucro Presumido pode ser mais interessante para:"
      },
      {
        type: "list",
        items: [
          "Empresas com margem de lucro acima da presumida",
          "Negócios que não se enquadram no Simples Nacional",
          "Empresas que faturam próximo ao teto do Simples",
          "Atividades específicas que têm vantagens fiscais no Presumido",
          "Empresas que precisam emitir notas fiscais com tributação destacada"
        ]
      },
      {
        type: "highlight",
        text: "Importante: A mudança de regime tributário só pode ser feita uma vez por ano, no mês de janeiro. Por isso, é fundamental fazer um planejamento tributário detalhado."
      },
      {
        type: "heading",
        text: "Como Saber Qual é o Melhor para Mim?"
      },
      {
        type: "paragraph",
        text: "A melhor forma de saber qual regime tributário é mais vantajoso é realizar um estudo detalhado considerando:"
      },
      {
        type: "list",
        items: [
          "Faturamento atual e projetado",
          "Tipo de atividade exercida",
          "Margem de lucro da empresa",
          "Quantidade de funcionários",
          "Despesas dedutíveis",
          "Obrigações acessórias que a empresa consegue cumprir"
        ]
      },
      {
        type: "paragraph",
        text: "A Cyrino Contabilidade realiza essa análise de forma gratuita para nossos clientes, garantindo que você pague menos impostos de forma totalmente legal."
      }
    ]
  },
  {
    slug: "estrategias-reduzir-impostos",
    icon: TrendingUp,
    title: "5 Estratégias para Reduzir Impostos Legalmente",
    excerpt: "Aprenda técnicas de planejamento tributário que podem reduzir significativamente a carga fiscal da sua empresa.",
    category: "Planejamento Tributário",
    date: "5 de Janeiro, 2025",
    readTime: "10 min",
    color: "from-purple-500 to-pink-500",
    content: [
      {
        type: "paragraph",
        text: "O Brasil tem uma das maiores cargas tributárias do mundo, e muitas empresas pagam mais impostos do que deveriam por falta de planejamento tributário adequado. Veja como reduzir sua carga fiscal de forma legal e segura."
      },
      {
        type: "heading",
        text: "1. Escolha do Regime Tributário Correto"
      },
      {
        type: "paragraph",
        text: "Como vimos anteriormente, a escolha entre Simples Nacional, Lucro Presumido e Lucro Real pode representar uma diferença de milhares de reais por ano. Muitas empresas permanecem no regime errado por anos, perdendo dinheiro sem perceber."
      },
      {
        type: "highlight",
        text: "Uma análise tributária anual pode identificar oportunidades de economia de 20% a 40% em impostos."
      },
      {
        type: "heading",
        text: "2. Aproveitamento de Incentivos Fiscais"
      },
      {
        type: "paragraph",
        text: "Existem diversos incentivos fiscais disponíveis que muitas empresas desconhecem:"
      },
      {
        type: "list",
        items: [
          "Lei do Bem - Para empresas que investem em inovação tecnológica",
          "Lei Rouanet - Para apoio a projetos culturais",
          "Lei de Informática - Benefícios para indústria de TI",
          "PAT (Programa de Alimentação do Trabalhador)",
          "Incentivos estaduais e municipais específicos"
        ]
      },
      {
        type: "heading",
        text: "3. Gestão Eficiente de Custos e Despesas"
      },
      {
        type: "paragraph",
        text: "No regime de Lucro Real, todas as despesas operacionais podem ser deduzidas da base de cálculo do imposto. Isso inclui:"
      },
      {
        type: "list",
        items: [
          "Aluguel e condomínio do estabelecimento",
          "Salários e encargos trabalhistas",
          "Despesas com marketing e publicidade",
          "Manutenção de equipamentos",
          "Despesas com treinamento e capacitação",
          "Material de escritório e consumo"
        ]
      },
      {
        type: "highlight",
        text: "Atenção: Mantenha sempre a documentação fiscal organizada. Uma nota fiscal extraviada pode representar perda de dedução e aumento de impostos."
      },
      {
        type: "heading",
        text: "4. Planejamento de Pró-Labore e Distribuição de Lucros"
      },
      {
        type: "paragraph",
        text: "A forma como você retira dinheiro da empresa pode impactar significativamente na tributação:"
      },
      {
        type: "list",
        items: [
          "Pró-labore tem incidência de INSS (11% a 20%) e IR (0% a 27,5%)",
          "Distribuição de lucros é isenta de IR para pessoa física",
          "Encontrar o equilíbrio certo pode gerar economia significativa",
          "Considerar também benefícios fiscais da previdência privada"
        ]
      },
      {
        type: "heading",
        text: "5. Reorganização Societária"
      },
      {
        type: "paragraph",
        text: "Em alguns casos, reorganizar a estrutura da empresa pode trazer benefícios fiscais:"
      },
      {
        type: "list",
        items: [
          "Separação de atividades em empresas diferentes",
          "Criação de holding patrimonial",
          "Mudança de localização para aproveitar incentivos regionais",
          "Cisão ou fusão de empresas do grupo",
          "Implementação de estruturas de governança mais eficientes"
        ]
      },
      {
        type: "highlight",
        text: "Importante: Qualquer reorganização societária deve ser feita com planejamento e acompanhamento profissional para garantir conformidade legal."
      },
      {
        type: "heading",
        text: "Cuidados Importantes"
      },
      {
        type: "paragraph",
        text: "Ao implementar estratégias de redução de impostos, é fundamental:"
      },
      {
        type: "list",
        items: [
          "Sempre buscar a conformidade legal - elisão fiscal é legal, evasão é crime",
          "Documentar todas as operações adequadamente",
          "Manter a escrituração contábil em dia",
          "Revisar o planejamento tributário anualmente",
          "Contar com assessoria especializada",
          "Acompanhar mudanças na legislação"
        ]
      },
      {
        type: "paragraph",
        text: "A Cyrino Contabilidade oferece serviço completo de planejamento tributário, analisando todas as possibilidades legais de redução de impostos para seu negócio. Entre em contato e descubra quanto você pode economizar."
      }
    ]
  },
  {
    slug: "mei-guia-completo-2025",
    icon: Briefcase,
    title: "MEI: Tudo Que Você Precisa Saber em 2025",
    excerpt: "Guia completo sobre o Microempreendedor Individual, limites, obrigações e quando migrar para ME.",
    category: "MEI",
    date: "28 de Dezembro, 2024",
    readTime: "7 min",
    color: "from-orange-500 to-red-500",
    content: [
      {
        type: "paragraph",
        text: "O MEI (Microempreendedor Individual) é uma das formas mais simples e econômicas de formalizar um pequeno negócio no Brasil. Com mais de 15 milhões de MEIs ativos no país, entender bem esse regime é fundamental."
      },
      {
        type: "heading",
        text: "O Que é MEI?"
      },
      {
        type: "paragraph",
        text: "O MEI foi criado em 2008 para facilitar a formalização de pequenos empreendedores. É uma categoria empresarial simplificada com benefícios exclusivos e menos burocracia."
      },
      {
        type: "heading",
        text: "Requisitos para Ser MEI em 2025"
      },
      {
        type: "list",
        items: [
          "Faturamento máximo de R$ 81.000,00 por ano (R$ 6.750,00 por mês)",
          "Não ter participação em outra empresa como sócio ou titular",
          "Ter no máximo 1 funcionário contratado",
          "Exercer atividade permitida na lista do MEI",
          "Não ser pensionista do INSS (exceto por invalidez)"
        ]
      },
      {
        type: "heading",
        text: "Vantagens de Ser MEI"
      },
      {
        type: "list",
        items: [
          "Processo de abertura 100% gratuito e online",
          "CNPJ próprio para emitir notas fiscais",
          "Tributação fixa e reduzida (R$ 70 a R$ 75 por mês em 2025)",
          "Direito a benefícios previdenciários (aposentadoria, auxílio-doença, etc.)",
          "Possibilidade de vender para empresas e governo",
          "Acesso a serviços bancários empresariais",
          "Menos burocracia e obrigações acessórias"
        ]
      },
      {
        type: "heading",
        text: "Obrigações do MEI"
      },
      {
        type: "paragraph",
        text: "Apesar da simplificação, o MEI tem algumas obrigações que precisam ser cumpridas:"
      },
      {
        type: "list",
        items: [
          "Pagar mensalmente o DAS (Documento de Arrecadação do Simples)",
          "Fazer a Declaração Anual do Simples Nacional (DASN-SIMEI) até 31 de maio",
          "Emitir nota fiscal quando prestar serviços para pessoa jurídica",
          "Manter controle das receitas mensais",
          "Caso tenha funcionário, cumprir obrigações trabalhistas"
        ]
      },
      {
        type: "highlight",
        text: "Atenção: O não pagamento do DAS pode resultar em multas, juros e até mesmo o cancelamento do CNPJ."
      },
      {
        type: "heading",
        text: "Quando Migrar de MEI para ME?"
      },
      {
        type: "paragraph",
        text: "Existem alguns sinais de que chegou a hora de migrar do MEI para Microempresa:"
      },
      {
        type: "list",
        items: [
          "Faturamento ultrapassou ou vai ultrapassar R$ 81 mil no ano",
          "Necessidade de contratar mais de 1 funcionário",
          "Desejo de ter sócios no negócio",
          "Exercer atividade não permitida para MEI",
          "Participar de outras empresas",
          "Necessidade de emitir muitas notas fiscais (mais vantagem fiscal)"
        ]
      },
      {
        type: "heading",
        text: "Como Fazer a Migração"
      },
      {
        type: "paragraph",
        text: "O processo de migração de MEI para ME envolve:"
      },
      {
        type: "list",
        items: [
          "Comunicar o desenquadramento do MEI à Receita Federal",
          "Escolher o regime tributário adequado (Simples Nacional ou Lucro Presumido)",
          "Atualizar o cadastro na Junta Comercial",
          "Regularizar pendências se houver",
          "Adequar a contabilidade às novas exigências",
          "Emitir novos alvarás e licenças se necessário"
        ]
      },
      {
        type: "highlight",
        text: "Importante: A migração deve ser planejada com antecedência para evitar desenquadramento por excesso de faturamento, que gera multas e impostos retroativos."
      },
      {
        type: "heading",
        text: "Conclusão"
      },
      {
        type: "paragraph",
        text: "O MEI é uma excelente porta de entrada para o empreendedorismo formal no Brasil. No entanto, é importante conhecer seus limites e estar preparado para migrar quando o negócio crescer. A Cyrino Contabilidade pode ajudar você tanto na gestão do MEI quanto na migração para ME quando chegar o momento certo."
      }
    ]
  },
  {
    slug: "evite-malha-fina-irpf",
    icon: AlertCircle,
    title: "Declaração de IRPF: Evite a Malha Fina",
    excerpt: "Conheça os principais erros que levam contribuintes à malha fina e como evitá-los na sua declaração.",
    category: "IRPF",
    date: "20 de Dezembro, 2024",
    readTime: "9 min",
    color: "from-rose-500 to-pink-500",
    content: [
      {
        type: "paragraph",
        text: "Cair na malha fina da Receita Federal é um pesadelo que ninguém quer viver. Entenda o que leva uma declaração a ser retida e como evitar esse problema."
      },
      {
        type: "heading",
        text: "O Que é a Malha Fina?"
      },
      {
        type: "paragraph",
        text: "A malha fina é um sistema automatizado da Receita Federal que identifica inconsistências, erros ou possíveis fraudes nas declarações de Imposto de Renda. Quando sua declaração cai na malha fina, você fica impedido de receber a restituição até regularizar a situação."
      },
      {
        type: "heading",
        text: "Principais Erros Que Levam à Malha Fina"
      },
      {
        type: "paragraph",
        text: "Confira os erros mais comuns que fazem declarações serem retidas:"
      },
      {
        type: "list",
        items: [
          "Omissão de rendimentos - Não declarar todos os rendimentos recebidos",
          "Divergência de informações com fontes pagadoras",
          "Dedução indevida de despesas médicas sem comprovação",
          "Erros no CPF de dependentes",
          "Inclusão de dependentes em mais de uma declaração",
          "Dedução duplicada de pensão alimentícia",
          "Informações incorretas sobre imóveis e veículos",
          "Doações acima do limite permitido"
        ]
      },
      {
        type: "highlight",
        text: "Cerca de 1 milhão de declarações caem na malha fina todos os anos no Brasil. A boa notícia é que a maioria desses problemas pode ser evitada com atenção e organização."
      },
      {
        type: "heading",
        text: "Como Evitar a Malha Fina"
      },
      {
        type: "paragraph",
        text: "Siga estas dicas para manter sua declaração longe de problemas:"
      },
      {
        type: "list",
        items: [
          "Organize todos os documentos antes de começar a declaração",
          "Confira todos os informes de rendimentos recebidos",
          "Verifique se as informações batem com o que foi informado pelas fontes pagadoras",
          "Guarde todos os comprovantes de despesas dedutíveis por 5 anos",
          "Revise a declaração antes de enviar",
          "Não omita nenhum rendimento, por menor que seja",
          "Declare dependentes apenas se tiver direito legal",
          "Informe corretamente bens e direitos adquiridos ou vendidos"
        ]
      },
      {
        type: "heading",
        text: "Despesas Médicas: Cuidados Especiais"
      },
      {
        type: "paragraph",
        text: "As despesas médicas são uma das principais causas de retenção na malha fina. Fique atento:"
      },
      {
        type: "list",
        items: [
          "Só declare despesas que você realmente pagou e pode comprovar",
          "Guarde todos os recibos e notas fiscais",
          "Verifique se o CPF/CNPJ do prestador está correto",
          "Despesas com planos de saúde devem estar no informe da operadora",
          "Cirurgias estéticas não são dedutíveis, exceto reparadoras",
          "Medicamentos comprados em farmácia não são dedutíveis"
        ]
      },
      {
        type: "heading",
        text: "Dependentes e Pensão Alimentícia"
      },
      {
        type: "paragraph",
        text: "Erros envolvendo dependentes são muito comuns:"
      },
      {
        type: "list",
        items: [
          "Filhos até 21 anos podem ser dependentes (até 24 se estiverem estudando)",
          "Um dependente não pode constar em mais de uma declaração",
          "Pensão alimentícia judicial é dedutível, a voluntária não é",
          "Informe corretamente o CPF e data de nascimento dos dependentes",
          "Cônjuge pode ser dependente se não tiver rendimentos próprios significativos"
        ]
      },
      {
        type: "highlight",
        text: "Importante: Se você tem dúvidas sobre quem pode ser seu dependente, consulte um contador antes de declarar."
      },
      {
        type: "heading",
        text: "O Que Fazer Se Cair na Malha Fina"
      },
      {
        type: "paragraph",
        text: "Se sua declaração for retida, siga estes passos:"
      },
      {
        type: "list",
        items: [
          "Acesse o e-CAC (Centro Virtual de Atendimento) da Receita Federal",
          "Verifique qual foi a inconsistência identificada",
          "Reúna os documentos comprobatórios",
          "Envie uma declaração retificadora corrigindo os erros",
          "Ou apresente os documentos solicitados pela Receita",
          "Acompanhe o processamento da correção",
          "Se houver imposto devido, pague com os acréscimos legais"
        ]
      },
      {
        type: "heading",
        text: "Quando Contratar um Contador"
      },
      {
        type: "paragraph",
        text: "Considere contratar um profissional se:"
      },
      {
        type: "list",
        items: [
          "Você tem múltiplas fontes de renda",
          "Recebeu rendimentos no exterior",
          "Tem muitas despesas dedutíveis",
          "Comprou ou vendeu imóveis/veículos",
          "Tem investimentos complexos",
          "Já caiu na malha fina anteriormente",
          "Prefere ter segurança e evitar dores de cabeça"
        ]
      },
      {
        type: "paragraph",
        text: "A Cyrino Contabilidade oferece serviço completo de elaboração e revisão de Declaração de Imposto de Renda, garantindo que você aproveite todas as deduções possíveis e fique longe da malha fina."
      }
    ]
  }
];
