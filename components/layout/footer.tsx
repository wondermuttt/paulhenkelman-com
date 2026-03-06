import { siteConfig } from "@/content/site";

import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-[#f6f4ef]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <SocialLinks
          showLabel={false}
          include={["linkedin", "x", "github", "medium"] as const}
        />
        <div className="flex flex-col gap-1 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.footerIdentity}</p>
          <p>© {year} Paul Henkelman. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
