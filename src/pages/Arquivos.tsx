import ProfileHeader from "@/components/ProfileHeader";
import LinkSection from "@/components/LinkSection";
import LinkButton from "@/components/LinkButton";

const Arquivos = () => {
    return (
        <div className="min-h-screen bg-secondary relative overflow-hidden">
            {/* Background pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAgOS45NC04LjA2IDE4LTE4IDE4cy0xOC04LjA2LTE4LTE4IDguMDYtMTggMTgtMTggMTggOC4wNiAxOCAxOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
                <ProfileHeader />

                <div className="space-y-8 mt-8"> {/* Adicionei margin-top para separar do header */}

                    <LinkSection title="Departamento Pessoal" delay={100}>
                        <LinkButton
                            href="https://docs.google.com/document/d/1T942PSOHR6MpPkJ7pJZ2XMKiWLwai8sp/edit?usp=sharing&ouid=115327238397815677828&rtpof=true&sd=true"
                            icon="document"
                        >
                            Registro de Funcionário - Relação de Documentos
                        </LinkButton>
                        <LinkButton
                            href="https://docs.google.com/spreadsheets/d/1F--6FB-o5YU7wsm4_3bY6sSTMkSDQbbj/edit?usp=drive_link&ouid=115327238397815677828&rtpof=true&sd=true"
                            icon="calculator"
                        >
                            Registro de Funcionário - Simulação de Custo
                        </LinkButton>
                    </LinkSection>

                    <LinkSection title="Departamento Fiscal" delay={200}>
                        <LinkButton
                            href="https://auth.sieg.com/login"
                            icon="receipt"
                        >
                            SIEG - xml das Notas
                        </LinkButton>
                    </LinkSection>

                    <LinkSection title="Portal do Cliente" delay={300}>
                        <LinkButton
                            href="https://onvio.com.br/clientcenter/pt/"
                            icon="users"
                        >
                            ONVIO Portal do Cliente
                        </LinkButton>
                    </LinkSection>

                    <LinkSection title="MEI" delay={400}>
                        <LinkButton
                            href="https://docs.google.com/spreadsheets/d/1LyfDch46blPsEmymso94t3ZaRJxMTpWD/edit?usp=sharing&ouid=115327238397815677828&rtpof=true&sd=true"
                            icon="calculator"
                        >
                            Cálculo para saber se MEI precisa declarar IR
                        </LinkButton>
                        <LinkButton
                            href="https://docs.google.com/spreadsheets/d/1oO3vFRLYKp9QnrOlQaXoZ9RhQ9Adn4Jc/edit?usp=sharing&ouid=106590145691195419619&rtpof=true&sd=true"
                            icon="book"
                        >
                            Livro Caixa
                        </LinkButton>
                    </LinkSection>

                    <LinkSection title="Departamento Contábil" delay={500}>
                        <LinkButton
                            href="https://lp.cora.com.br/coraliados/?code=cyrino-contabilidade&n=Cyrino%20Contabilidade%20Ltda"
                            icon="building"
                        >
                            Banco Cora - Boletos Grátis, clique e abre sua conta PJ
                        </LinkButton>
                    </LinkSection>

                    <LinkSection title="Departamento Legalização" delay={600}>
                        <LinkButton
                            href="https://drive.google.com/file/d/1nU9-3wl3AVOj7g1_07jFTYXKbg7beg-l/view?usp=sharing"
                            icon="document"
                        >
                            Cadastro de Procuração Receita Federal
                        </LinkButton>
                        <LinkButton
                            href="https://drive.google.com/file/d/18Ppzu3M0-epxCjEz4Vgaxy864mFr6UUE/view?usp=sharing"
                            icon="file"
                        >
                            Documentos para Abertura e Alteração de Empresa
                        </LinkButton>
                        <LinkButton
                            href="https://drive.google.com/file/d/1GJx0sUNaiV8z0rIyowvYV4Ipz2gxZ_la/view?usp=sharing"
                            icon="file"
                        >
                            Documentos para Abertura e Alteração de MEI
                        </LinkButton>
                        <LinkButton
                            href="https://drive.google.com/file/d/1fwTZCfbJmXiuGCE8LrUXNhtcUbJv-yXx/view?usp=sharing"
                            icon="document"
                        >
                            Cartão CNPJ II - Passo a Passo Emissão
                        </LinkButton>
                    </LinkSection>

                    <LinkSection title="Emissor de Nota Fiscal" delay={700}>
                        <LinkButton
                            href="https://sistema.emissor.app/login"
                            icon="receipt"
                        >
                            Emissor Fácil
                        </LinkButton>
                        <LinkButton
                            href="http://nfe.nfenacional.com.br/login"
                            icon="receipt"
                        >
                            NFe Nacional
                        </LinkButton>
                    </LinkSection>

                    <LinkSection title="Imposto de Renda (IRPF)" delay={800}>
                        <LinkButton
                            href="https://drive.google.com/file/d/1RSpcIQk7Ad4ys9JcXT8HNTrVzP8KOTT5/view"
                            icon="receipt"
                        >
                            Documentos para Declarar IRPF
                        </LinkButton>
                        <LinkButton
                            href="https://www.restituicao.receita.fazenda.gov.br/#/"
                            icon="receipt"
                        >
                            Consulta Restituição
                        </LinkButton>
                    </LinkSection>

                    <LinkSection title="E-mails dos Departamentos" delay={900}>
                        <LinkButton href="mailto:cyrinocontabilidade@gmail.com" icon="mail">
                            Geral
                        </LinkButton>
                        <LinkButton href="mailto:dp.cyrinocontabilidade@gmail.com" icon="mail">
                            Departamento Pessoal (DP)
                        </LinkButton>
                        <LinkButton href="mailto:fiscal.cyrinocontabilidade@gmail.com" icon="mail">
                            Departamento Fiscal
                        </LinkButton>
                        <LinkButton href="mailto:xml.cyrinocontabilidade@gmail.com" icon="mail">
                            Envio de XML de Notas
                        </LinkButton>
                        <LinkButton href="mailto:contabil.cyrinocontabilidade@gmail.com" icon="mail">
                            Departamento Contábil
                        </LinkButton>
                        <LinkButton href="mailto:legal.cyrinocontabilidade@gmail.com" icon="mail">
                            Departamento Legal
                        </LinkButton>
                        <LinkButton href="mailto:cd.cyrinocontabilidade@gmail.com" icon="mail">
                            Certificado Digital
                        </LinkButton>
                        <LinkButton href="mailto:ir.cyrinocontabilidade@gmail.com" icon="mail">
                            Imposto de Renda (IRPF)
                        </LinkButton>
                    </LinkSection>

                    <LinkSection title="Contato Rápido" delay={1000}>
                        <LinkButton
                            href="https://wa.me/551832657176"
                            icon="phone"
                        >
                            WhatsApp OFICIAL
                        </LinkButton>
                        <LinkButton
                            href="https://cyrinocontabilidade.com.br"
                            icon="globe"
                        >
                            Site OFICIAL
                        </LinkButton>
                    </LinkSection>

                </div>
            </div>
        </div>
    );
};

export default Arquivos;