import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  BarChart3,
  Search,
  Calendar,
  Users,
  BookOpen,
  MessageSquare,
  ArrowRight,
  Clock,
} from "lucide-react";
import Hero from "@/components/hero";
import Post from "@/components/feed/post";
import Poll from "@/components/feed/poll";
import LostAndFound from "@/components/feed/laf";
import Header from "@/components/header";

const samplePost = {
  _id: "sample-post",
  content:
    "Join us for the biggest technology event of the year featuring workshops, hackathons, and networking opportunities. Don't miss out on this amazing opportunity to learn and connect with industry professionals!",
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  filesMedia: [],
  sections: ["Technology"],
  classes: ["Computer Science"],
  tags: ["techfest"],
};

const samplePoll = {
  _id: "sample-poll",
  title: "What should be the theme for this year's farewell?",
  description:
    "Vote for your favorite theme and help us plan the perfect farewell celebration. Your voice matters!",
  createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  options: [
    { content: "Retro Vibes", votes: 45 },
    { content: "Futuristic", votes: 32 },
    { content: "Cultural Fusion", votes: 23 },
    { content: "Masquerade Ball", votes: 18 },
    { content: "Carnival Night", votes: 27 },
  ],
  sections: ["Student Life"],
  classes: ["All Classes"],
  tags: ["farewell", "theme", "celebration"],
};

const sampleLaf = {
  _id: "sample-laf",
  lost: "Blue Water Bottle",
  found: false,
  content:
    "Lost my blue water bottle with a white cap in the main library near the study area. It has my name 'Sarah' written on it. Please contact me if you find it!",
  createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  sections: ["Library"],
  classes: ["All Classes"],
  tags: ["waterbottle", "library", "lost"],
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Overview */}
      <section className="px-4 py-16 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need, All in One Place
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three powerful features designed to make your campus life easier
              and more engaging.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Digital Notice Board */}
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Digital Notice Board</CardTitle>
                <CardDescription>
                  Stay updated with the latest announcements, events, and
                  important information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Events & Announcements</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span>Exam Schedules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>Club Activities</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Polls */}
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Interactive Polls</CardTitle>
                <CardDescription>
                  Voice your opinion and see what your campus community thinks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    <span>Quick Voting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span>Real-time Results</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>Community Voice</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lost & Found */}
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Lost & Found</CardTitle>
                <CardDescription>
                  Find your lost items or help others recover theirs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-yellow-500" />
                    <span>Easy Posting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span>Direct Contact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>Quick Recovery</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Content Preview */}
      <section className="px-4 py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See It in Action
            </h2>
            <p className="text-lg text-gray-600">
              Here's what you'll find on your campus companion
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              {/* Sample Notice */}
              <Post item={samplePost} />

              {/* Sample Lost & Found */}
              <div className="mt-8">
                <LostAndFound item={sampleLaf} />
              </div>
            </div>

            {/* Sample Poll */}
            <Poll item={samplePoll} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 bg-blue-600 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using Campus Companion to
            stay connected and informed. It's free, simple, and designed just
            for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/sign-in">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" asChild>
              <a href="/feed">View Feed</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm">
            © 2025 Campus Companion. Built with ❤️ for students, by students.
          </p>
          <p className="text-xs mt-2">
            Powered by Next.js, TypeScript, and Sanity CMS
          </p>
        </div>
      </footer>
    </div>
  );
}
