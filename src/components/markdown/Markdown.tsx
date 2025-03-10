import { variants } from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import { fontFamily } from "@/utils/fonts";
import { FC, memo } from "react";
import MarkdownDisplay, {
  MarkdownProps as MarkdownDisplayProps,
} from "react-native-markdown-display";

type MarkdownProps = MarkdownDisplayProps & {
  children: string;
};

const Markdown: FC<MarkdownProps> = ({
  children,
  mergeStyle = true,
  style = {},
  ...rest
}) => {
  const {
    body,
    text,
    paragraph,
    em,
    strong,
    heading1,
    heading2,
    heading3,
    heading4,
    heading5,
    heading6,
    list_item,
    ...restStyles
  } = style;

  const { theme } = useTheme();

  return (
    <MarkdownDisplay
      mergeStyle={mergeStyle}
      style={{
        body: {
          color: theme["base-300"].DEFAULT,
          ...variants.intent.md,
          ...body,
        },
        text: {
          ...text,
        },
        paragraph: {
          marginTop: 0,
          marginBottom: 16,
          ...paragraph,
        },
        em: {
          ...variants.italic.normal,
          ...em,
        },
        strong: {
          color: theme["base-300"].DEFAULT,
          ...variants.weight.semibold,
          ...strong,
        },
        heading1: {
          color: theme["base-300"].DEFAULT,
          ...variants.intent.h1,
          marginBottom: 16,
          ...heading1,
        },
        heading2: {
          color: theme["base-300"].DEFAULT,
          ...variants.intent.h2,
          marginBottom: 16,
          ...heading2,
        },
        heading3: {
          color: theme["base-300"].DEFAULT,
          ...variants.intent.h3,
          marginBottom: 16,
          ...heading3,
        },
        heading4: {
          color: theme["base-300"].DEFAULT,
          ...variants.intent.h4,
          marginBottom: 16,
          ...heading4,
        },
        heading5: {
          color: theme["base-300"].DEFAULT,
          ...variants.intent.h5,
          marginBottom: 16,
          ...heading5,
        },
        heading6: {
          color: theme["base-300"].DEFAULT,
          ...variants.intent.h6,
          marginBottom: 4,
          ...heading6,
        },
        list_item: {
          marginVertical: 4,
          flexDirection: "row",
          alignItems: "flex-start",
          ...list_item,
        },
        bullet_list: {
          marginBottom: 16,
        },
        ordered_list: {
          marginBottom: 16,
        },
        bullet_list_icon: {
          marginRight: 12,
          marginTop: 11,
          backgroundColor: theme["base-100"].DEFAULT,
          width: 4,
          height: 4,
          borderRadius: 2,
        },
        ordered_list_icon: {
          marginRight: 12,
          color: theme["base-200"].DEFAULT,
          fontFamily: fontFamily["Inter-Regular"],
          fontSize: 14,
        },
        table: {
          marginVertical: 16,
          borderWidth: 1,
          borderColor: theme["neutral-content"][700],
          borderRadius: 8,
          overflow: "hidden",
        },
        thead: {
          backgroundColor: theme.secondary[500],
        },
        th: {
          padding: 12,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme["neutral-content"][700],
          fontFamily: fontFamily["Inter-SemiBold"],
        },
        td: {
          padding: 12,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme["neutral-content"][700],
        },
        tr: {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: theme["neutral-content"][700],
        },
        blockquote: {
          marginBottom: 16,
          paddingLeft: 16,
          borderLeftWidth: 2,
          borderColor: theme.primary.DEFAULT,
          opacity: 0.8,
        },
        code_inline: {
          fontFamily: "monospace",
          backgroundColor: theme.secondary[500],
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
          fontSize: 14,
        },
        code_block: {
          fontFamily: "monospace",
          backgroundColor: theme.secondary[500],
          padding: 16,
          borderRadius: 8,
          marginVertical: 16,
          fontSize: 14,
        },
        hr: {
          marginVertical: 24,
          height: 1,
          backgroundColor: theme["neutral-content"][700],
        },
        link: {
          color: theme["accent"].DEFAULT,
          textDecorationLine: "none",
        },
        image: {
          marginVertical: 16,
          borderRadius: 8,
        },
        ...restStyles,
      }}
      {...rest}
    >
      {children}
    </MarkdownDisplay>
  );
};

export default memo(Markdown);
