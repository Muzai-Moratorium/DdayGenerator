"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithubSquare, FaLanguage } from "react-icons/fa";
import styles from "./page.module.scss";

type Lang = "ko" | "en";

const translations = {
  ko: {
    github: "깃허브 방문",
    title: "D-Day Badge Generator",
    subtitle:
      "나만의 D-Day 배지를 만들어 GitHub 리드미에 장식해보세요. URL 파라미터로 누구나 쉽게 커스텀할 수 있습니다.",
    dateLabel: "기준 날짜 (시작일)",
    textLabel: "배지 텍스트 (라벨)",
    colorLabel: "포인트 색상 (텍스트)",
    bgLabel: "배경 색상",
    previewTitle: "미리보기 (Live Preview)",
    copy: "Copy",
    copied: "✔",
    placeholder: "예: Study Hard",
    markdown: "Markdown",
    html: "HTML",
  },
  en: {
    github: "Visit GitHub",
    title: "D-Day Badge Generator",
    subtitle:
      "Create your own D-Day badge and decorate your GitHub README. Anyone can easily customize it with URL parameters.",
    dateLabel: "Base Date (Start Date)",
    textLabel: "Badge Text (Label)",
    colorLabel: "Point Color (Text)",
    bgLabel: "Background Color",
    previewTitle: "Live Preview",
    copy: "Copy",
    copied: "✔",
    placeholder: "e.g., Study Hard",
    markdown: "Markdown",
    html: "HTML",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const [date, setDate] = useState("2025-09-22");
  const [label, setLabel] = useState("Coding Since 2025.09.22");
  const [color, setColor] = useState("#333ab2");
  const [bg, setBg] = useState("#e0e7ff");
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [origin, setOrigin] = useState("");

  const t = translations[lang];

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const cleanHex = (hex: string) => hex.replace("#", "");

  const getBadgeUrl = () => {
    const params = new URLSearchParams({
      date,
      label,
      color: cleanHex(color),
      bg: cleanHex(bg),
    });
    return `${origin}/api/dday?${params.toString()}`;
  };

  const getMarkdown = () => {
    return `![${label}](${getBadgeUrl()})`;
  };

  const getHtml = () => {
    return `<div align="center"><img src="${getBadgeUrl()}" /></div>`;
  };

  const handleCopyMd = async () => {
    try {
      await navigator.clipboard.writeText(getMarkdown());
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopyHtml = async () => {
    try {
      await navigator.clipboard.writeText(getHtml());
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleLang = () => {
    setLang((prev) => (prev === "ko" ? "en" : "ko"));
  };

  return (
    <main className={styles.container}>
      <div className={styles.topActions}>
        <Link
          href="https://github.com/Muzai-Moratorium"
          target="_blank"
          className={styles.actionButton}
          title={t.github}
        >
          <FaGithubSquare size={24} />
        </Link>
        <button className={styles.actionButton} onClick={toggleLang}>
          <FaLanguage size={24} />
          <span>{lang === "ko" ? "EN" : "KO"}</span>
        </button>
      </div>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>

      <div className={styles.card}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="badge-date" className={styles.label}>
              {t.dateLabel}
            </label>
            <input
              id="badge-date"
              type="date"
              className={styles.input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="badge-label" className={styles.label}>
              {t.textLabel}
            </label>
            <input
              id="badge-label"
              type="text"
              className={styles.input}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={t.placeholder}
            />
          </div>

          <div className={styles.colorRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="badge-color" className={styles.label}>
                {t.colorLabel}
              </label>
              <input
                id="badge-color"
                type="color"
                className={`${styles.input} ${styles.colorInput}`}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="badge-bg" className={styles.label}>
                {t.bgLabel}
              </label>
              <input
                id="badge-bg"
                type="color"
                className={`${styles.input} ${styles.colorInput}`}
                value={bg}
                onChange={(e) => setBg(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.previewSection}>
          <h3 className={styles.label}>{t.previewTitle}</h3>
          {origin ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={getBadgeUrl()}
              alt="D-Day Badge Preview"
              className={styles.previewImage}
            />
          ) : null}

          <div className={styles.guideGrid}>
            <div className={styles.guideItem}>
              <span className={styles.guideLabel}>{t.markdown}</span>
              <div className={styles.codeBlock}>
                <code className={styles.codeText}>{getMarkdown()}</code>
                <button
                  className={styles.copyButton}
                  onClick={handleCopyMd}
                  type="button"
                >
                  {copiedMd ? t.copied : t.copy}
                </button>
              </div>
            </div>

            <div className={styles.guideItem}>
              <span className={styles.guideLabel}>{t.html}</span>
              <div className={styles.codeBlock}>
                <code className={styles.codeText}>{getHtml()}</code>
                <button
                  className={styles.copyButton}
                  onClick={handleCopyHtml}
                  type="button"
                >
                  {copiedHtml ? t.copied : t.copy}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
