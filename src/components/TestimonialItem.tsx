
import { Card, CardContent } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

type Testimonial = {
    rating: number;
    text: string;
    name: string;
    date: string;
    link: string;
};

const TestimonialItem = ({ testimonial, googleBadge }: { testimonial: Testimonial, googleBadge: string }) => {
    return (
        <Card className="w-[300px] md:w-[400px] h-[350px] shrink-0 flex flex-col bg-gradient-to-br from-white to-secondary/5 backdrop-blur-sm border-0 shadow-strong border-t-4 border-secondary/30 hover:scale-[1.02] transition-transform duration-300">
            <CardContent className="pt-6 flex flex-col h-full">
                <Check className="h-8 w-8 text-secondary mb-4 shrink-0" />

                <div className="flex gap-1 mb-4 shrink-0">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin">
                    <p className="text-foreground/80 leading-relaxed text-justify text-sm md:text-base">
                        "{testimonial.text}"
                    </p>
                </div>

                <div className="pt-4 border-t border-secondary/10 mt-4 flex items-center justify-between shrink-0">
                    <div>
                        <p className="font-semibold text-navy-dark text-sm">{testimonial.name}</p>
                        <p className="text-xs text-foreground/60">{testimonial.date}</p>
                    </div>

                    <a
                        href={testimonial.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-secondary/5 hover:bg-secondary/10 text-secondary-foreground px-3 py-1.5 rounded-full transition-colors group/btn"
                    >
                        <span className="text-xs font-bold text-secondary group-hover/btn:text-primary transition-colors">Ver original</span>
                        <img
                            src={googleBadge}
                            alt="Google"
                            className="h-5 w-auto opacity-80 group-hover/btn:opacity-100 transition-opacity"
                        />
                    </a>
                </div>
            </CardContent>
        </Card>
    );
};

export default TestimonialItem;
