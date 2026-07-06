import { createResource, For, Show, type JSX } from "solid-js";
import { useApi } from "../contexts/ServicesContext";
import styles from "./Approvals.module.css";

interface PendingItem {
    type: string;
    id: number;
    title: string;
    data: unknown;
}

export default function Approvals(): JSX.Element {
    const api = useApi();
    const ky = api.getKy();

    const [items, { refetch }] = createResource(
        async (): Promise<PendingItem[]> =>
            ky.get("admin/approvals/pending").json<PendingItem[]>(),
    );

    const handleApprove = async (type: string, id: number): Promise<void> => {
        await ky.post(`admin/approvals/${type}/${id}/approve`);
        refetch();
    };

    const handleReject = async (type: string, id: number): Promise<void> => {
        await ky.post(`admin/approvals/${type}/${id}/reject`);
        refetch();
    };

    return (
        <div class={`container ${styles.adminApprovals}`}>
            <h2 class={styles.approvalsTitle}>Pending Approvals</h2>
            <Show when={items()} fallback={<div>Loading...</div>}>
                <Show when={items()!.length === 0}>
                    <p>No pending items.</p>
                </Show>
                <div class={styles.approvalsList}>
                    <For each={items()}>
                        {(item) => (
                            <div class={styles.approvalCard}>
                                <div class={styles.approvalHeader}>
                                    <span class={styles.approvalType}>
                                        {item.type}
                                    </span>
                                    <span class={styles.approvalTitle}>
                                        {item.title}
                                    </span>
                                </div>
                                <pre class={styles.approvalData}>
                                    {JSON.stringify(item.data, null, 2)}
                                </pre>
                                <div class={styles.approvalActions}>
                                    <button
                                        class={`btn btn-success ${styles.btnSuccess}`}
                                        onClick={() =>
                                            handleApprove(item.type, item.id)
                                        }
                                    >
                                        Approve
                                    </button>
                                    <button
                                        class="btn btn-danger"
                                        onClick={() =>
                                            handleReject(item.type, item.id)
                                        }
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
}
