import type { CustomThemeConfig } from "@skeletonlabs/tw-plugin"

export const customTheme: CustomThemeConfig = {
	name: "custom-theme",
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "0px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "255 255 255",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #2779a7
		"--color-primary-50": "223 235 242", // #dfebf2
		"--color-primary-100": "212 228 237", // #d4e4ed
		"--color-primary-200": "201 222 233", // #c9dee9
		"--color-primary-300": "169 201 220", // #a9c9dc
		"--color-primary-400": "104 161 193", // #68a1c1
		"--color-primary-500": "39 121 167", // #2779a7
		"--color-primary-600": "35 109 150", // #236d96
		"--color-primary-700": "29 91 125", // #1d5b7d
		"--color-primary-800": "23 73 100", // #174964
		"--color-primary-900": "19 59 82", // #133b52
		// secondary | #DF6C4F
		"--color-secondary-50": "250 233 229", // #fae9e5
		"--color-secondary-100": "249 226 220", // #f9e2dc
		"--color-secondary-200": "247 218 211", // #f7dad3
		"--color-secondary-300": "242 196 185", // #f2c4b9
		"--color-secondary-400": "233 152 132", // #e99884
		"--color-secondary-500": "223 108 79", // #DF6C4F
		"--color-secondary-600": "201 97 71", // #c96147
		"--color-secondary-700": "167 81 59", // #a7513b
		"--color-secondary-800": "134 65 47", // #86412f
		"--color-secondary-900": "109 53 39", // #6d3527
		// tertiary | #49c5b6
		"--color-tertiary-50": "228 246 244", // #e4f6f4
		"--color-tertiary-100": "219 243 240", // #dbf3f0
		"--color-tertiary-200": "210 241 237", // #d2f1ed
		"--color-tertiary-300": "182 232 226", // #b6e8e2
		"--color-tertiary-400": "128 214 204", // #80d6cc
		"--color-tertiary-500": "73 197 182", // #49c5b6
		"--color-tertiary-600": "66 177 164", // #42b1a4
		"--color-tertiary-700": "55 148 137", // #379489
		"--color-tertiary-800": "44 118 109", // #2c766d
		"--color-tertiary-900": "36 97 89", // #246159
		// success | #49c58f
		"--color-success-50": "228 246 238", // #e4f6ee
		"--color-success-100": "219 243 233", // #dbf3e9
		"--color-success-200": "210 241 227", // #d2f1e3
		"--color-success-300": "182 232 210", // #b6e8d2
		"--color-success-400": "128 214 177", // #80d6b1
		"--color-success-500": "73 197 143", // #49c58f
		"--color-success-600": "66 177 129", // #42b181
		"--color-success-700": "55 148 107", // #37946b
		"--color-success-800": "44 118 86", // #2c7656
		"--color-success-900": "36 97 70", // #246146
		// warning | #DF6C4F
		"--color-warning-50": "250 233 229", // #fae9e5
		"--color-warning-100": "249 226 220", // #f9e2dc
		"--color-warning-200": "247 218 211", // #f7dad3
		"--color-warning-300": "242 196 185", // #f2c4b9
		"--color-warning-400": "233 152 132", // #e99884
		"--color-warning-500": "223 108 79", // #DF6C4F
		"--color-warning-600": "201 97 71", // #c96147
		"--color-warning-700": "167 81 59", // #a7513b
		"--color-warning-800": "134 65 47", // #86412f
		"--color-warning-900": "109 53 39", // #6d3527
		// error | #e74a23
		"--color-error-50": "251 228 222", // #fbe4de
		"--color-error-100": "250 219 211", // #fadbd3
		"--color-error-200": "249 210 200", // #f9d2c8
		"--color-error-300": "245 183 167", // #f5b7a7
		"--color-error-400": "238 128 101", // #ee8065
		"--color-error-500": "231 74 35", // #e74a23
		"--color-error-600": "208 67 32", // #d04320
		"--color-error-700": "173 56 26", // #ad381a
		"--color-error-800": "139 44 21", // #8b2c15
		"--color-error-900": "113 36 17", // #712411
		// surface | #A8D0E6
		"--color-surface-50": "242 248 251", // #f2f8fb
		"--color-surface-100": "238 246 250", // #eef6fa
		"--color-surface-200": "233 243 249", // #e9f3f9
		"--color-surface-300": "220 236 245", // #dcecf5
		"--color-surface-400": "194 222 238", // #c2deee
		"--color-surface-500": "168 208 230", // #A8D0E6
		"--color-surface-600": "151 187 207", // #97bbcf
		"--color-surface-700": "126 156 173", // #7e9cad
		"--color-surface-800": "101 125 138", // #657d8a
		"--color-surface-900": "82 102 113" // #526671
	}
}
