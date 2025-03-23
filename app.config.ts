export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
    },
    slideover: {
      variants: {
        side: {
          left: {
            content: 'left-0 inset-y-0 w-56',
          },
        },
      },
    },
    breadcrumb: {
      slots: {
        linkLeadingIcon: 'shrink-0 size-3',
        link: 'group relative flex items-center gap-1.5 text-xs min-w-0 focus-visible:outline-(--ui-primary)',
        separatorIcon: 'shrink-0 size-4 text-(--ui-text-muted)',
      },
    },
  },
})
