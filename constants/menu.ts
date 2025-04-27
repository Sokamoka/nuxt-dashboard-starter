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
              to: "/users",
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
        to: "/chat",
      },
      {
        label: "Settings",
        icon: "i-lucide-settings",
        children: [
          {
            label: "Profile",
            icon: "i-lucide-user",
            description: "Define shortcuts for your application.",
            to: '/settings/profile'
          },
          {
            label: "Password",
            icon: "i-lucide-key",
            description: "Display a modal/slideover within your application.",
            to: '/settings/password'
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
