import { profile } from "../../data/profile";
import SocialLinks from "../ui/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold gradient-text">
            {profile.brand}
          </p>
          <p className="mt-2 text-sm text-muted">
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>
        <SocialLinks links={profile.social} />
      </div>
    </footer>
  );
}
