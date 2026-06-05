import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SEO from "@/components/SEO";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/conteudos" replace />;
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <SEO
        title={`${post.title} | Cyrino Contabilidade`}
        description={post.excerpt}
        url={`https://www.cyrinocontabilidade.com.br/conteudos/${post.slug}`}
        image="https://www.cyrinocontabilidade.com.br/og-image.jpg"
      />
      <div className="min-h-screen pt-20 bg-background">
        {/* Back Button */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild className="group">
              <Link to="/conteudos">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Voltar para Conteúdos
              </Link>
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <span
                  className={`inline-block px-4 py-2 bg-gradient-to-r ${post.color} text-white text-sm font-semibold rounded-full`}
                >
                  {post.category}
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground animate-fade-in-up">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" />
                  {post.readTime} de leitura
                </span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <div className="space-y-6 text-foreground leading-relaxed">
                  {post.content.map((section, index) => (
                    <div key={index}>
                      {section.type === "heading" && (
                        <h2 className="font-heading text-2xl md:text-3xl font-bold mt-8 mb-4 text-foreground">
                          {section.text}
                        </h2>
                      )}
                      {section.type === "paragraph" && (
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {section.text}
                        </p>
                      )}
                      {section.type === "list" && (
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                          {section.items?.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {section.type === "highlight" && (
                        <Card className="my-6 border-l-4 border-l-primary bg-muted">
                          <CardContent className="p-6">
                            <p className="text-foreground font-medium leading-relaxed">
                              {section.text}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ))}
                </div>
              </article>

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-heading text-lg font-semibold mb-4 text-foreground">
                  Compartilhe este artigo
                </h3>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                        "_blank",
                      )
                    }
                  >
                    <Facebook size={18} className="mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`,
                        "_blank",
                      )
                    }
                  >
                    <Twitter size={18} className="mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                        "_blank",
                      )
                    }
                  >
                    <Linkedin size={18} className="mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              {/* CTA Section */}
              <Card className="mt-12 bg-gradient-to-br from-primary via-orange-500 to-secondary text-white border-0">
                <CardContent className="p-8 md:p-12 text-center">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                    Precisa de Ajuda Especializada?
                  </h3>
                  <p className="text-lg mb-6 opacity-95">
                    Nossa equipe está pronta para ajudar seu negócio a crescer
                  </p>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 font-semibold"
                    asChild
                  >
                    <Link to="/contato">Falar com um Contador</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-muted">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-foreground">
                  Artigos Relacionados
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <Card
                      key={index}
                      className="group hover:shadow-xl transition-all duration-300 border hover:border-primary overflow-hidden"
                    >
                      <div
                        className={`h-2 bg-gradient-to-r ${relatedPost.color}`}
                      ></div>
                      <CardContent className="p-6">
                        <div className="mb-3">
                          <span className="inline-block px-2 py-1 bg-muted text-xs font-medium rounded">
                            {relatedPost.category}
                          </span>
                        </div>
                        <h4 className="font-heading text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <Button variant="ghost" className="w-full" asChild>
                          <Link to={`/conteudos/${relatedPost.slug}`}>
                            Ler Artigo
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPost;
