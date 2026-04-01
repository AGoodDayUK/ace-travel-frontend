import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  LayoutDashboard, Globe, Map, Tag, HelpCircle, Star, Settings,
  Image, FileText, LogOut, ChevronRight, Users, Menu, X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tours", label: "Tours", icon: Map },
  { href: "/admin/deals", label: "Deals", icon: Tag },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/users", label: "CMS Users", icon: Users },
];

interface CmsLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function CmsLayout({ children, title }: CmsLayoutProps) {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const meQuery = trpc.cms.auth.me.useQuery();
  const logout = trpc.cms.auth.logout.useMutation({
    onSuccess: () => navigate("/admin/login"),
  });

  useEffect(() => {
    if (meQuery.isSuccess && !meQuery.data) {
      navigate("/admin/login");
    }
  }, [meQuery.isSuccess, meQuery.data]);

  if (meQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!meQuery.data) return null;

  const user = meQuery.data;

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-60 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-800 flex-shrink-0">
          <div>
            <p className="text-white font-bold text-sm">ACE Travel</p>
            <p className="text-teal-400 text-xs">Content Manager</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map((item) => {
            const active = location === item.href || location.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-teal-500/15 text-teal-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* View site + user */}
        <div className="p-3 border-t border-gray-800 space-y-2 flex-shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <Globe className="w-4 h-4" />
            View Live Site
          </a>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-teal-400 text-xs font-bold">
                {(user.name ?? user.username).charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{user.name ?? user.username}</p>
              <p className="text-gray-500 text-xs capitalize">{user.role}</p>
            </div>
            <button
              onClick={() => logout.mutate()}
              className="text-gray-500 hover:text-red-400 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center px-4 lg:px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white mr-4"
          >
            <Menu className="w-5 h-5" />
          </button>
          {title && <h1 className="text-white font-semibold text-lg">{title}</h1>}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
