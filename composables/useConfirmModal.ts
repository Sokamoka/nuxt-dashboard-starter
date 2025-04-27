import ConfirmModal from "~/components/ConfirmModal.vue";

export function useConfirmModal() {
  const overlay = useOverlay();

  return overlay.create(ConfirmModal, {
    props: {
      title: "Are you sure?",
      message: "",
    },
  });
}
