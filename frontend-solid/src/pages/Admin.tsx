import { createSignal, For, Show, type JSX } from "solid-js";
import CivilizationsTab from "../components/admin/CivilizationsTab";
import PeriodsTab from "../components/admin/PeriodsTab";
import styles from "./Admin.module.css";

type TabType =
    | "civilizations"
    | "periods"
    | "events"
    | "persons"
    | "evidence"
    | "themes";

const TABS: { key: TabType; label: string }[] = [
    { key: "civilizations", label: "Civilizations" },
    { key: "periods", label: "Periods" },
    { key: "events", label: "Events" },
    { key: "persons", label: "Persons" },
    { key: "evidence", label: "Evidence" },
    { key: "themes", label: "Themes" },
];

export default function Admin(): JSX.Element {
    const [activeTab, setActiveTab] = createSignal<TabType>("civilizations");

    return (
        <div class={styles.adminDashboardFull}>
            <h1 class={styles.adminTitle}>Admin Dashboard</h1>
            <div class={styles.adminTabs}>
                <For each={TABS}>
                    {(tab) => (
                        <button
                            class={`${styles.adminTab} ${activeTab() === tab.key ? styles.adminTabActive : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    )}
                </For>
            </div>
            <div class={styles.adminTabContent}>
                <Show when={activeTab() === "civilizations"}>
                    <CivilizationsTab />
                </Show>
                <Show when={activeTab() === "periods"}>
                    <PeriodsTab />
                </Show>
                <Show when={activeTab() === "events"}>
                    <div>Tab content coming</div>
                </Show>
                <Show when={activeTab() === "persons"}>
                    <div>Tab content coming</div>
                </Show>
                <Show when={activeTab() === "evidence"}>
                    <div>Tab content coming</div>
                </Show>
                <Show when={activeTab() === "themes"}>
                    <div>Tab content coming</div>
                </Show>
            </div>
        </div>
    );
}
