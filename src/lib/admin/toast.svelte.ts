export interface Toast {
	id: string;
	type: 'success' | 'error' | 'info';
	message: string;
	title?: string;
	duration?: number;
}

class ToastManager {
	toasts = $state<Toast[]>([]);

	add(toast: Omit<Toast, 'id'>) {
		const id = Math.random().toString(36).substring(2, 9);
		const newToast: Toast = {
			id,
			duration: 4000,
			...toast
		};
		this.toasts.push(newToast);

		if (newToast.duration && newToast.duration > 0) {
			setTimeout(() => {
				this.remove(id);
			}, newToast.duration);
		}
		return id;
	}

	success(message: string, title = 'Berhasil') {
		return this.add({ type: 'success', message, title });
	}

	error(message: string, title = 'Terjadi Kesalahan') {
		return this.add({ type: 'error', message, title, duration: 6000 });
	}

	info(message: string, title = 'Informasi') {
		return this.add({ type: 'info', message, title });
	}

	remove(id: string) {
		const index = this.toasts.findIndex((t) => t.id === id);
		if (index !== -1) {
			this.toasts.splice(index, 1);
		}
	}

	clear() {
		this.toasts = [];
	}
}

export const toast = new ToastManager();
