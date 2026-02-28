import { User, Heart, Brain, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export function TravAIFunctionsUseCases() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/time-ai-background.dim_1920x1080.png)' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              TRAV AI Functions & Use Cases
            </h1>
            <p className="text-lg text-muted-foreground">
              Personalized assistance and adaptive intelligence for individual users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-accent" />
                  Personalization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">User Profiling</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn individual preferences, habits, and communication styles
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Adaptive Responses</h4>
                  <p className="text-sm text-muted-foreground">
                    Tailor interactions based on user context and historical patterns
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Preference Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Remember and apply user-specific settings across all interactions
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Personal Assistance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Task Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Organize personal tasks, reminders, and to-do lists intelligently
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Information Retrieval</h4>
                  <p className="text-sm text-muted-foreground">
                    Find and summarize relevant information based on user needs
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Proactive Suggestions</h4>
                  <p className="text-sm text-muted-foreground">
                    Anticipate needs and offer helpful recommendations
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Learning & Adaptation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Continuous Learning</h4>
                  <p className="text-sm text-muted-foreground">
                    Improve responses based on user feedback and interactions
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Context Awareness</h4>
                  <p className="text-sm text-muted-foreground">
                    Understand situational context and adjust behavior accordingly
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Pattern Recognition</h4>
                  <p className="text-sm text-muted-foreground">
                    Identify recurring needs and automate routine assistance
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">TIME AI Handoff</h4>
                  <p className="text-sm text-muted-foreground">
                    Seamlessly transfer complex tasks to TIME AI when needed
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Context Preservation</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain conversation history and user preferences across agents
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Unified Experience</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide consistent service quality across the dual-agent system
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader>
              <CardTitle>Real-World Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Personal Productivity</h4>
                <p className="text-sm text-muted-foreground">
                  Manage daily schedules, prioritize tasks, and provide personalized reminders based on individual work patterns and preferences.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Customer Support</h4>
                <p className="text-sm text-muted-foreground">
                  Deliver personalized customer service with context-aware responses, remembering past interactions and user-specific issues.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Personal Finance</h4>
                <p className="text-sm text-muted-foreground">
                  Track spending habits, provide budget recommendations, and offer personalized financial advice based on individual goals and circumstances.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
