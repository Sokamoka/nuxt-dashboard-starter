export function sidebarMenu(isAdminUser: boolean) {
  return [
    [
      {
        label: "Main",
        type: "label",
      },
      {
        label: "Home",
        icon: "i-lucide-house",
        to: "/",
      },
      ...(isAdminUser
        ? [
            {
              label: "Users",
              type: "label",
            },
            {
              label: "Administration",
              icon: "i-lucide-users",
              to: "/dashboard",
            },
          ]
        : [
            {
              label: "Users",
              type: "label",
              badge: "Admin Only",
              disabled: true,
            },
            {
              label: "Administration",
              icon: "i-lucide-users",
              to: "/dashboard",
              disabled: true,
            },
          ]),
      {
        label: "Other",
        type: "label",
      },
      {
        label: "Tasks",
        icon: "i-lucide-calendar-check-2",
        to: "/tasks",
      },
      {
        label: "Chat",
        icon: "i-lucide-bot-message-square",
        to: "/ws",
      },
      {
        label: "Composables",
        icon: "i-lucide-database",
        children: [
          {
            label: "defineShortcuts",
            icon: "i-lucide-file-text",
            description: "Define shortcuts for your application.",
            // to: '/composables/define-shortcuts'
          },
          {
            label: "useOverlay",
            icon: "i-lucide-file-text",
            description: "Display a modal/slideover within your application.",
            // to: '/composables/use-overlay'
          },
          {
            label: "useToast",
            icon: "i-lucide-file-text",
            description: "Display a toast within your application.",
            // to: '/composables/use-toast'
          },
        ],
      },
      {
        label: "Components",
        icon: "i-lucide-box",
        to: "/components",
        active: false,
        defaultOpen: false,
        children: [
          {
            label: "Link",
            icon: "i-lucide-file-text",
            description: "Use NuxtLink with superpowers.",
            // to: '/components/link'
          },
          {
            label: "Modal",
            icon: "i-lucide-file-text",
            description: "Display a modal within your application.",
            // to: '/components/modal'
          },
          {
            label: "NavigationMenu",
            icon: "i-lucide-file-text",
            description: "Display a list of links.",
            // to: '/components/navigation-menu'
          },
          {
            label: "Pagination",
            icon: "i-lucide-file-text",
            description: "Display a list of pages.",
            // to: '/components/pagination'
          },
          {
            label: "Popover",
            icon: "i-lucide-file-text",
            description:
              "Display a non-modal dialog that floats around a trigger element.",
            // to: '/components/popover'
          },
          {
            label: "Progress",
            icon: "i-lucide-file-text",
            description: "Show a horizontal bar to indicate task progression.",
            // to: '/components/progress'
          },
        ],
      },
    ],
    [
      {
        label: "GitHub",
        icon: "i-simple-icons-github",
        badge: "3.8k",
        to: "https://github.com/nuxt/ui",
        target: "_blank",
      },
      {
        label: "Help",
        icon: "i-lucide-circle-help",
        disabled: true,
      },
    ],
  ];
}
